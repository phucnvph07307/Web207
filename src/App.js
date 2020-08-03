import React, { useEffect, useState } from "react";
import Routers from "./routers";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/product").then((res) => {
      const list = res.data;
      setProducts(list);
    });

    axios.get("http://127.0.0.1:8000/api/category").then((res) => {
      const list = res.data;
      setCategories(list);
    });
  }, []);

  const onHandleRemove = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/product/${id}`).then((res) => {
      const newProducts = [...products];
      newProducts.forEach((element, index) => {
        if (element.id == id) newProducts.splice(index, 1);
      });
      console.log(newProducts);
      setProducts(newProducts);
    });
  };

  const onHandleCreateProduct = (item) => {
    setProducts([...products, item]);
  };

  const onHandleUpdateProduct = (id, value_edit) => {
    value_edit.id = id;
    const newProducts = [...products];
    newProducts.forEach((element, index) => {
      if (element.id == id) newProducts.splice(index, 1);
    });
    setProducts([...newProducts, value_edit]);
    console.log(products);
  };
  const onaddCart = (e) => {
    alert(e);
  };
  return (
    <div className="App">
      <Routers
        products={products}
        categories={categories}
        onRemove={onHandleRemove}
        onCreateProduct={onHandleCreateProduct}
        onUpdateProduct={onHandleUpdateProduct}
        addCart={onaddCart}
      />
    </div>
  );
}
export default App;
