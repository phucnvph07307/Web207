import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import $ from "jquery";
import { useForm } from "react-hook-form";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const UpdateProduct = ({ products, onUpdateProduct }) => {
  const { control, register, errors, handleSubmit } = useForm();
  let history = useHistory();
  const { id } = useParams();
  const [valueInput, setInput] = useState({
    id: id,
  });

  const [short_desc, setDesc] = useState("");
  const [detail, setDetail] = useState("");

  const onSubmit = (data) => {
    data.short_desc = short_desc;
    data.detail = detail;
    const url = `http://127.0.0.1:8000/api/product/${id}`;
    axios
      .put(url, data)
      .then(function (response) {
        console.log({ response });
        if (response.statusText === "OK" && response.status < 300) {
          Swal.fire({
            position: "bottom-center",
            icon: "success",
            title: "Sửa thành công",
            showConfirmButton: false,
            timer: 1500,
          });
          onUpdateProduct(id, data);
          history.push("/admin/products");
        } else {
          Swal.fire({
            position: "bottom-center",
            icon: "warning",
            title: "Sửa thất bại",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      {products.map((el) => {
        if (el.id == id) {
          console.log(el);
          return (
            <div className="card shadow mb-4" key={el.id}>
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Update Product{" "}
                </h6>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label>Name Product</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        defaultValue={el.name}
                        ref={register({ required: true })}
                      />
                      <span className="text-danger">
                        {errors.name && "* Vui lòng điền tên sản phẩm"}
                      </span>
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        type="text"
                        name="price"
                        className="form-control"
                        defaultValue={el.price}
                        ref={register({ required: true, min: 0 })}
                      />
                      <span className="text-danger">
                        {errors.price?.type === "required" &&
                          "* Vui lòng nhập giá sản phẩm"}
                        {errors.price?.type === "min" &&
                          "* Vui lòng nhập giá lớn hơn 0 VND"}
                      </span>
                    </div>
                    <div className="form-group">
                      <label>Url Image</label>
                      <input
                        type="text"
                        name="image"
                        className="form-control"
                        defaultValue={el.image}
                        ref={register({ required: true })}
                      />
                      <span className="text-danger">
                        {errors.image && "* Vui lòng điền url Image"}
                      </span>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={el.short_desc}
                        onInit={(editor) => {
                          const data = editor.getData();
                          setDesc(data);
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setDesc(data);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Detail</label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={el.detail}
                        onInit={(editor) => {
                          const data = editor.getData();
                          setDetail(data);
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setDetail(data);
                        }}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

UpdateProduct.propTypes = {};

export default UpdateProduct;
