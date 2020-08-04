import React, { useEffect, useState } from "react";
import Routers from "./routers";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const getTotal = (array = []) => {
    const res = array.reduce((prev, item) => {
      return prev + item.price * item.quantity;
    }, 0);
    setTotal(res);
  };
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/product").then((res) => {
      const list = res.data;
      setProducts(list);
    });

    axios.get("http://127.0.0.1:8000/api/category").then((res) => {
      const list = res.data;
      setCategories(list);
    });
    let shoppingCartItems = [];
    if (localStorage["shopping-cart-items"] != null) {
      shoppingCartItems = JSON.parse(
        localStorage["shopping-cart-items"].toString()
      );
    }
    setCart(shoppingCartItems);
    getTotal(shoppingCartItems);
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
  };

  const onHandleAddCart = async (id, quantity = 1) => {
    const check = cart.every((item) => {
      return item.id !== id;
    });
    if (check) {
      const data = products.find((product) => product.id == id);
      data.quantity = quantity;
      const newCart = [...cart, data];
      setCart(newCart);
      localStorage["shopping-cart-items"] = JSON.stringify(newCart);
      getTotal(newCart);
    } else {
      cart.forEach((element) => {
        if (element.id == id) {
          element.quantity++;
        }
      });
      localStorage["shopping-cart-items"] = JSON.stringify(cart);
      getTotal(cart);
    }
  };
  const onHandleRedution = (id) => {
    cart.forEach((item) => {
      if (item.id == id) {
        if (item.quantity == 1) {
          item.quantity = 1;
        } else {
          item.quantity--;
        }
      }
    });
    setCart([...cart]);
    localStorage["shopping-cart-items"] = JSON.stringify(cart);
    getTotal(cart);
  };

  const onHandleIncrease = (id) => {
    cart.forEach((item) => {
      if (item.id === id) {
        item.quantity++;
      }
    });
    setCart([...cart]);
    localStorage["shopping-cart-items"] = JSON.stringify(cart);
    getTotal(cart);
  };
  const onHandlRemoveItemCart = (id) => {
    if (window.confirm("xóa?")) {
      cart.forEach((item, index) => {
        if (item.id === id) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
      localStorage["shopping-cart-items"] = JSON.stringify(cart);
      getTotal(cart);
    }
  };
  const onHandleClearCart = () => {
    setCart([]);
    localStorage["shopping-cart-items"] = JSON.stringify([]);
  };

  return (
    <div className="App">
      <Routers
        products={products}
        categories={categories}
        onRemove={onHandleRemove}
        onCreateProduct={onHandleCreateProduct}
        onUpdateProduct={onHandleUpdateProduct}
        onAddCart={onHandleAddCart}
        cart={cart}
        redution={onHandleRedution}
        increase={onHandleIncrease}
        removeItemCart={onHandlRemoveItemCart}
        total={total}
        clearCart={onHandleClearCart}
        getTotal={getTotal}
      />
    </div>
  );
}
export default App;
