import * as React from 'react';
import { Link } from 'react-router-dom';
import data from './data/db.json';
import { src, srcset } from './js/utils';
import Header from './Header';
import Footer from './Footer';
import Recommendations from './Recommendations';

const HomePage: React.FC = () => {
  return (
    <div data-boundary-page="explore">
      <Header />
      <main className="e_HomePage">
        {data.teaser.map(({ title, image, url }, i) => (
          <Link key={i} className="e_HomePage__categoryLink" to={url}>
            <img
              src={src(image, 500)}
              srcSet={srcset(image, [500, 1000])}
              sizes="100vw, (min-width: 500px) 50vw"
              alt=""
            />
            {title}
          </Link>
        ))}
        <div className="e_HomePage__recommendations">
          <Recommendations skus={['CL-01-GY', 'AU-07-MT']} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
