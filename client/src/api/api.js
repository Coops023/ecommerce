import axios from "axios";

export class Products {
  constructor() {
    //baseUrl could be overwritten in the route that uses the API
    const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5005";
    this.baseURL = `${baseUrl}`;
    this.api = axios.create({
      baseURL: this.baseURL,
    });
  }

  // // CHANGE THE PATHS ACCORDING TO API DOCUMENTATION
  getAll() {
    return this.api.get("/all-products");
  }
  getAllHeadphones() {
    return this.api.get("/all-headphones");
  }
  getAllSpeakers() {
    return this.api.get("/all-speakers");
  }
  getAllEarphones() {
    return this.api.get("/all-earphones");
  }
  getOne(id) {
    return this.api.get(`/product/${id}`);
  }
  topWines() {
    return this.api.get(`/top-wine`);
  }
  search(query, page) {
    return this.api.get(`/search/?q=${query}&page=${page}`);
  }
  createOne(newEntityValues) {
    return this.api.post("/create-wine", newEntityValues);
  }
  // deleteOne = (id)=> this.api.delete(`/${id}`)
  // updateOne = (id)=> this.api.put(`/${id}`)
  // // etc...
}

export default Products;
