import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({request}: LoaderFunctionArgs) {
  const onlineStoreStatusPage = request.url.replace(
    '/algemene-voorwaarden',
    '/policies/terms-of-service',
  );

  return redirect(onlineStoreStatusPage);
}
