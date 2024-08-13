import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VariantOption from './components/VariantOption';
import data from './data/db.json';
import { src, srcset } from './js/utils';

import Header from 'explore/Header';
import Footer from 'explore/Footer';
import Recommendations from 'explore/Recommendations';
import AddToCart from 'checkout/AddToCart';

function useSku() {
  const [sku, setSku] = React.useState(() => new URL(location.href).searchParams.get('sku'));
  const navigate = useNavigate();

  return [
    sku,
    (val: string) => {
      navigate(`?sku=${val}`, { replace: true });
      setSku(val);
    },
  ] as const;
}

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const [sku, setSku] = useSku();
  const { name, variants, highlights = [] } = data.products.find((p) => p.id === id);
  const variant = variants.find((v) => v.sku === sku) || variants[0];

  const handleSkuSelect = (ev: React.MouseEvent) => {
    const attr = (ev.target as HTMLElement).getAttribute('href');

    if (attr) {
      const val = attr.substring(attr.indexOf('?sku=') + 5);
      setSku(val);
    }
  };

  return (
    <div data-boundary-page="decide">
      <Header />
      <main className="d_ProductPage">
        <div className="d_ProductPage__details">
          <img
            className="d_ProductPage__productImage"
            src={src(variant.image, 400)}
            srcSet={srcset(variant.image, [400, 800])}
            sizes="400px"
            width="400"
            height="400"
            alt={`${name} - ${variant.name}`}
          />
          <div className="d_ProductPage__productInformation">
            <h2 className="d_ProductPage__title">{name}</h2>
            <ul className="d_ProductPage__highlights">
              {highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
            <ul className="d_ProductPage__variants" onClick={handleSkuSelect}>
              {variants.map((v, i) => (
                <VariantOption key={i} {...{ ...v, selected: v.sku === variant.sku }} />
              ))}
            </ul>
            <AddToCart sku={variant.sku} />
          </div>
        </div>
        <Recommendations skus={[variant.sku]} />
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
