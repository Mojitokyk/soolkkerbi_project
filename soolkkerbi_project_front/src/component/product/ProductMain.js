import ProductList from "./ProductList";
import ProductWrite from "./ProductWrite";
import "./productMain.css";
import { Routes, Route } from "react-router-dom";

const ProductMain = () => {
  return (
    <div>
      <div>ProductMain</div>
      <Routes>
        <Route path="write" element={<ProductWrite />}></Route>
        <Route path="*" element={<ProductList />}></Route>
      </Routes>
    </div>
  );
};

export default ProductMain;
