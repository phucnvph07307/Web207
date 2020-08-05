import api from "./axiosHttp";

const getAll = () => {
  return api.get("/product");
};

const get = (id) => {
  return api.get(`/product/${id}`);
};

const create = (data) => {
  return api.post("/product", data);
};

const update = (id, data) => {
  return api.put(`/product/${id}`, data);
};

const remove = (id) => {
  console.log(id);
  return api.delete(`/product/${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};
