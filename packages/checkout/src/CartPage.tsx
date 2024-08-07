import * as React from 'react';
import type { PageComponentProps } from 'app';
import LineItem from './components/LineItem';
import Button from './components/Button';
import data from './data/db.json';
import { useLineItems } from './data/store';

function convertToLineItems(items: Array<{ sku: string; quantity: number }>) {
  return items.reduce((res, { sku, quantity }) => {
    const variant = data.variants.find((p) => p.sku === sku);
    if (variant) {
      res.push({ ...variant, quantity, total: variant.price * quantity });
    }
    return res;
  }, []);
}

const CartPage: React.FC<PageComponentProps> = ({ piral }) => {
  const rawLineItems = useLineItems();
  const lineItems = convertToLineItems(rawLineItems);
  const total = lineItems.reduce((res, { total }) => res + total, 0);
  const skus = lineItems.map(({ sku }) => sku);

  return (
    <div data-boundary-page="checkout">
      <piral.Extension name="header" />
      <main className="c_CartPage">
        <h2>Basket</h2>
        <ul className="c_CartPage__lineItems">
          {lineItems.map((li, i) => (
            <LineItem key={i} {...li} />
          ))}
        </ul>
        <hr />
        <p className="c_CartPage__total">Total: {total} Ø</p>
        <div className="c_CartPage__buttons">
          <Button href="/checkout/checkout" variant="primary">
            Checkout
          </Button>
          <Button href="/" variant="secondary">
            Continue Shopping
          </Button>
        </div>
        <piral.Extension name="recommendations" params={{ skus }} />
      </main>
      <piral.Extension name="footer" />
    </div>
  );
};

export default CartPage;
