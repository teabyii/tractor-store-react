import { h } from "preact";
import Recommendations from "../components/Recommendations";
import { useEffect, useState, useRef } from "preact/hooks";
import { fetchFragmentData } from "../fetchData";

const RecommendationsCe = ({ skus }, initialState) => {
  const [state, setState] = useState(initialState);
  const isInitialRender = useRef(true);

  useEffect(async () => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (!skus) return;
    const data = await fetchFragmentData("recommendations", { skus });
    setState(data);
  }, [skus]);

  return <Recommendations {...state} />;
};

RecommendationsCe.propTypes = {
  skus: String,
};

export default RecommendationsCe;
