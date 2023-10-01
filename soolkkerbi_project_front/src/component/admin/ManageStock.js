import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import axios from "axios";
import { Button4 } from "../util/Buttons";
import Input from "../util/InputForm";
import Swal from "sweetalert2";

const ManageStock = () => {
  const [productList, setProductList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get("/product/readAllProduct/" + reqPage)
      .then((res) => {
        setProductList(res.data.list);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);

  return (
    <div className="admin-content-wrap">
      <div className="admin-content-title">상품재고 관리</div>
      <div className="admin-content-tbl">
        <table>
          <thead>
            <tr>
              <td width={"10%"}>상품번호</td>
              <td width={"10%"}>상품구분</td>
              <td width={"30%"}>상품명</td>
              <td width={"15%"}>상품가격</td>
              <td width={"25%"}>상품수량</td>
              <td width={"10%"}>재고변경</td>
            </tr>
          </thead>
          <tbody>
            {productList.map((product, index) => {
              return (
                <ProductItem
                  key={"product" + index}
                  product={product}
                  setProduct={setProduct}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="admin-paging-wrap">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>
    </div>
  );
};

const ProductItem = (props) => {
  const product = props.product;
  const setProduct = props.setProduct;
  const productPrice = product.productPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const setProductStock = (data) => {
    product.productStock = data;
    setProduct({ ...product });
  };

  const updateStock = () => {
    const productNo = product.productNo;
    const productStock = product.productStock;
    const p = { productNo, productStock };

    axios
      .post("/product/updateStock", p)
      .then((res) => {
        if (res.data === 1) {
          Swal.fire("재고가 변경되었습니다.");
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  const addStock = () => {
    let productStock = product.productStock;
    productStock++;
    setProductStock(productStock);
  };

  const removeStock = () => {
    let productStock = product.productStock;
    if (productStock !== 0) {
      productStock--;
    }
    setProductStock(productStock);
  };

  return (
    <tr>
      <td>{product.productNo}</td>
      <td>
        {product.productCase === 1
          ? "탁주"
          : product.productCase === 2
          ? "약,청주"
          : product.productCase === 3
          ? "과실주"
          : "증류주"}
      </td>
      <td>{product.productName}</td>
      <td>
        {productPrice}
        <span> 원</span>
      </td>
      <td>
        <div className="admin-product-stock-wrap">
          <div className="admin-product-stock">
            <span
              className="material-icons stock-mg-btn"
              onClick={() => {
                addStock();
              }}
            >
              add_circle
            </span>
          </div>
          <div className="admin-product-stock-text">
            <Input
              type="text"
              data={product.productStock === 0 ? "0" : product.productStock}
              setData={setProductStock}
              content="productStock"
            />
          </div>
          <div className="admin-product-stock">
            <span
              className="material-icons stock-mg-btn"
              onClick={() => {
                removeStock();
              }}
            >
              remove_circle
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="admin-change-btn-box">
          <Button4 text="변경" clickEvent={updateStock} />
        </div>
      </td>
    </tr>
  );
};

export default ManageStock;
