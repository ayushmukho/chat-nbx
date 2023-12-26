import axios from "axios";

export default class API {
  constructor() {
    this.instance = axios.create({
      baseURL: `http://localhost:3000/api/v1`,
    });
  }

  createChat(body) {
    return this.instance.post("/chat", body);
  }
}
