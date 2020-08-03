import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CreateProduct = ({ categories, onCreateProduct }) => {
  useEffect(() => {}, []);
  const { control, register, errors, handleSubmit } = useForm();
  let history = useHistory();
  const [valueInput, setInput] = useState({});

  const AddItem = (e) => {
    let event = e.target;
    let name = event.name;
    let value = event.value;
    setInput({
      ...valueInput,
      [name]: value,
    });
  };
  const [desc, setDesc] = useState("");
  const [detail, setDetail] = useState("");

  const onSubmit = (data) => {
    data.short_desc = desc;
    data.detail = detail;

    axios
      .post("http://127.0.0.1:8000/api/product", data)
      .then(function (response) {
        console.log({ response });
        if (response.statusText === "Created" && response.status < 300) {
          Swal.fire({
            position: "bottom-center",
            icon: "success",
            title: "Thêm thành công",
            showConfirmButton: false,
            timer: 1500,
          });

          onCreateProduct({
            ...valueInput,
            id: response.data.id,
          });

          history.push("/admin/products");
        } else {
          Swal.fire({
            position: "bottom-center",
            icon: "warning",
            title: "Thêm thất bại",
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
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">New Product</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Categories:</label>
              <select name="cate_id" class="form-control">
                {categories.map((elment, index) => (
                  <option key={index} value={elment.id}>
                    {elment.cate_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Name Product:</label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={AddItem}
                ref={register({
                  required: true,
                  pattern: /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,}$/g,
                })}
              />
              <span className="text-danger">
                {errors.name?.type === "required" &&
                  "* Vui lòng nhập tên sản phẩm"}
                {errors.name?.type === "pattern" &&
                  "* Vui lòng nhập tên sản phẩm"}
              </span>
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                name="price"
                className="form-control"
                onChange={AddItem}
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
                onChange={AddItem}
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
                data={desc}
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
                data={detail}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDetail(data);
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

CreateProduct.propTypes = {};

export default CreateProduct;
