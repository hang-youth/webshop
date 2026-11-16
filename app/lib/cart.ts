import type {CartQueryDataReturn, HydrogenCart} from '@shopify/hydrogen';

const MISSING_CART_MESSAGE = /specified cart does not exist|cart not found/i;

/**
 * Shopify returns `cart: null` when the cart id in the cookie no longer
 * exists. That is a normal expiry, not an uncaught exception.
 */
export function isMissingCart(result: CartQueryDataReturn) {
  if (result?.cart) return false;

  const messages = [
    ...(result?.userErrors ?? []).map((error) => error.message),
    ...(result?.errors ?? []).map((error) => error.message),
  ];

  return messages.some(
    (message) => !!message && MISSING_CART_MESSAGE.test(message),
  );
}

export function cartMutationHeaders(
  cart: HydrogenCart,
  result: CartQueryDataReturn,
) {
  const cartId = result?.cart?.id;

  if (cartId) {
    return {cartId, headers: cart.setCartId(cartId)};
  }

  const headers = new Headers();
  if (isMissingCart(result)) {
    headers.append('Set-Cookie', 'cart=; Path=/; Max-Age=0');
  }

  return {cartId, headers};
}
