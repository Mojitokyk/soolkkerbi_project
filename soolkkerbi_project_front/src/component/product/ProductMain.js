import FruitList from "./FruitList";
import ProductWrite from "./ProductWrite";
import SpiritsList from "./SpiritsList";
import TakjuList from "./TakjuList";
import YakjuList from "./YakjuList";
import { Routes, Route } from "react-router-dom";

const ProductMain = (props) => {
  const isLogin = props.isLogin;
  return (
    <Routes>
      <Route path="takju" element={<TakjuList isLogin={isLogin} />}></Route>
      <Route path="yakju" element={<YakjuList isLogin={isLogin} />}></Route>
      <Route path="fruit" element={<FruitList isLogin={isLogin} />}></Route>
      <Route path="spirits" element={<SpiritsList isLogin={isLogin} />}></Route>
    </Routes>
  );
};

export default ProductMain;
