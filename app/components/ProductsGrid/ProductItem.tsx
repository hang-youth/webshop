import {Link} from '@remix-run/react';
import {ProductItemFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {Image, Money} from '@shopify/hydrogen';

export default function ProductItem({
  product,
  loading,
}: {
  product: ProductItemFragment;
  loading?: 'eager' | 'lazy';
}) {
  let url = `/products/${product.handle}`;
  if (product.variant && product.variant.nodes.length > 0) {
    const variant = product.variants.nodes[0];
    const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
    if (variantUrl) {
      url = variantUrl;
    }
  }

  const image = product.featuredImage || product.images.nodes[0];
  return (
    <Link
      className={'product-item'}
      key={product.id}
      prefetch="intent"
      to={url}
    >
      {image && (
        <Image
          alt={image.altText || product.title}
          aspectRatio="1/1"
          data={image}
          loading={loading}
          sizes="(min-width: 45em) 400px, 100vw"
        />
      )}

      <div className="product-item-details">
        <div>
          <h4>{product.title}</h4>
          <div className="product-price">
            {product.compareAtPriceRange?.minVariantPrice ? (
              <div className="product-price-on-sale">
                <Money data={product.priceRange.minVariantPrice} />
                <s>
                  <Money data={product.compareAtPriceRange.minVariantPrice} />
                </s>
              </div>
            ) : (
              <Money data={product.priceRange.minVariantPrice} />
            )}
          </div>
        </div>
        <div>
          <button className="button button--primary button--cyan">
            Bekijk
          </button>
        </div>
      </div>
    </Link>
  );
}
