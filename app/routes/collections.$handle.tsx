import {json, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {Pagination, getPaginationVariables} from '@shopify/hydrogen';
import {default as CollectionComponent} from '~/components/Collection';
import {COLLECTION_QUERY} from '~/graphql/CollectionQuery';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {
      title: `HANG YOUTH | ${
        data?.collection.title.toUpperCase() ?? ''
      } COLLECTIE`,
    },
  ];
};

export async function loader({request, params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  if (!handle) {
    return redirect('/collections');
  }

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {handle, ...paginationVariables},
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }
  return json({collection});
}

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();

  return <CollectionComponent collection={collection} />;
}
