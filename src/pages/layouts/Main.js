import React from "react";
import Header from "../../components/Main/Header";
import Footer from "../../components/Main/Footer";

export default ({ children }) => {
  console.log("render Main");

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
