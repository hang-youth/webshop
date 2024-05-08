import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({request}: LoaderFunctionArgs) {
  const onlineStoreStatusPage = request.url.replace(
    '/verzend-beleid',
    '/policies/shipping-policy',
  );

  return redirect(onlineStoreStatusPage);
}
