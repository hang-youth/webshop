import {ProductItemFragment} from 'storefrontapi.generated';
import ProductItem from './ProductItem';

export default function ProductsGrid({
  products,
}: {
  products: ProductItemFragment[];
}) {
  return (
    <div className="products-grid">
      {products.map((product, index) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            loading={index < 8 ? 'eager' : undefined}
          />
        );
      })}
    </div>
  );
}
