import {Collection as CollectionType} from '@shopify/hydrogen/storefront-api-types';
import {Pagination} from '@shopify/hydrogen';
import ProductsGrid from '../ProductsGrid';

export function Collection({collection}: {collection: CollectionType}) {
  return (
    <div className="collection">
      <h1>{collection.title}</h1>
      {collection.description && collection.description !== '' && (
        <p className="collection-description">{collection.description}</p>
      )}
      <Pagination connection={collection.products}>
        {({nodes, isLoading, PreviousLink, NextLink}) => (
          <>
            <PreviousLink>
              {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
            </PreviousLink>
            <ProductsGrid products={nodes} />
            <br />
            <NextLink>
              {isLoading ? 'Loading...' : <span>Load more ↓</span>}
            </NextLink>
          </>
        )}
      </Pagination>
    </div>
  );
}

export default Collection;
