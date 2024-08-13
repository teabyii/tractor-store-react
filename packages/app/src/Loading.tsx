import * as React from 'react';

import "./css/Loading.css";

const Loading: React.FC = () => {
  return (
    <div className="loader-frame">
      <span className="loader" />
    </div>
  );
}

export default Loading;
