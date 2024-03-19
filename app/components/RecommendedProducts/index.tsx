import {Await, Link} from '@remix-run/react';
import {Suspense} from 'react';
import type {RecommendedProductsQuery} from 'storefrontapi.generated';
import ProductItem from '../ProductsGrid/ProductItem';

export default function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery>;
}) {
  // console.log('bla bla', products);
  return (
    <div className="recommended-products">
      <h2>Andere vette shit</h2>
      <Suspense fallback={<div>Laden...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="recommended-products-grid">
              {products.nodes.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}
