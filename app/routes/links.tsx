import {redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({request}: LoaderFunctionArgs) {
  const onlineStoreStatusPage = request.url.replace('/links', '/pages/links');

  return redirect(onlineStoreStatusPage);
}
