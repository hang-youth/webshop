import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money, getPaginationVariables} from '@shopify/hydrogen';
import type {FeaturedCollectionFragment} from 'storefrontapi.generated';
import Collection from '~/components/Collection';

import {COLLECTION_QUERY} from '~/graphql/CollectionQuery';

export const meta: MetaFunction = () => {
  return [{title: 'HANG YOUTH | SHOP'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  const {collections} = await context.storefront.query(COLLECTIONS_QUERY, {
    variables: {
      first: 10,
    },
  });

  // Get all collections individually
  const collectionPromises = collections.nodes.map((collection) => {
    return storefront.query(COLLECTION_QUERY, {
      variables: {
        handle: collection.handle,
        first: 32,
      },
    });
  });

  const collectionsData = (await Promise.all(collectionPromises)).map(
    (result) => result.collection,
  );

  // const featuredCollection = collections.nodes[0];
  // const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer({
    // featuredCollection,
    // recommendedProducts,
    collections: collectionsData,
  });
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  console.log(data.collections);
  return (
    <div className="home">
      {/* <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} /> */}
      {data.collections.map((collection) => (
        <Collection key={collection.id} collection={collection} />
      ))}
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const;
