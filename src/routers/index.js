import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Main from "../pages/layouts/Main";
import MainAdmin from "../pages/layouts/MainAdmin";
//Admin
import Dashboard from "../pages/views/Admin/Dashboard";
import ProductsManager from "../pages/views/Admin/Products";

//Views
import About from "../pages/views/Main/About";
import Home from "../pages/views/Main/Home";
import CreateProduct from "../pages/views/Admin/Products/create";
import UpdateProduct from "../pages/views/Admin/Products/update";
import ShowProduct from "../pages/views/Admin/Products/show";
import Contact from "../pages/views/Main/Contact";
import Blog from "../pages/views/Main/Blog";
import Shop from "../pages/views/Main/Shop";
import DetailProduct from "../pages/views/Main/DetailProduct";
import Login from "../pages/views/Admin/Login";

const Routers = ({
  products,
  categories,
  onRemove,
  onCreateProduct,
  onUpdateProduct,
  addCart,
}) => {
  const onHandleRemove = (id) => {
    onRemove(id);
  };
  const onHandleCreateProduct = (item) => {
    onCreateProduct(item);
  };
  const onHandleUpdateProduct = (id, value_edit) => {
    onUpdateProduct(id, value_edit);
  };
  const onaddCart = (e) => {
    addCart(e);
  };
  return (
    <Router>
      <Switch>
        <Route path="/admin/login/">
          <Login />
        </Route>
        <Route path="/admin/logout/">logout</Route>
        <Route path="/admin/:path?/:path?">
          <MainAdmin>
            <Switch>
              <Route path="/admin/" exact>
                <Dashboard />
              </Route>
              <Route path="/admin/products/" exact>
                <ProductsManager
                  categories={categories}
                  products={products}
                  onRemove={onHandleRemove}
                />
              </Route>

              <Route path="/admin/product/create" exact>
                <CreateProduct
                  categories={categories}
                  onCreateProduct={onHandleCreateProduct}
                />
              </Route>
              <Route path="/admin/products/edit/:id">
                <UpdateProduct
                  products={products}
                  categories={categories}
                  onUpdateProduct={onHandleUpdateProduct}
                />
              </Route>
              <Route path="/admin/products/:id">
                <ShowProduct products={products} />
              </Route>
            </Switch>
          </MainAdmin>
        </Route>
        <Route>
          <Main>
            <Switch>
              <Route path="/" exact>
                <Home products={products} addCart={onaddCart} />
              </Route>
              <Route path="/shop">
                <Shop products={products} />
              </Route>
              <Route path="/blog">
                <Blog />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="/show/:id">
                <DetailProduct products={products} />
              </Route>
            </Switch>
          </Main>
        </Route>
      </Switch>
    </Router>
  );
};

Routers.propTypes = {};

export default Routers;
