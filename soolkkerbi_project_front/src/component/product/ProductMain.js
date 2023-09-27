import FruitList from "./FruitList";
import ProductWrite from "./ProductWrite";
import SpiritsList from "./SpiritsList";
import TakjuList from "./TakjuList";
import YakjuList from "./YakjuList";
import { Routes, Route } from "react-router-dom";

const ProductMain = () => {
  return (
    <Routes>
      <Route path="write" element={<ProductWrite />}></Route>
      <Route path="takju" element={<TakjuList />}></Route>
      <Route path="yakju" element={<YakjuList />}></Route>
      <Route path="fruit" element={<FruitList />}></Route>
      <Route path="spirits" element={<SpiritsList />}></Route>
    </Routes>
  );
};

export default ProductMain;
