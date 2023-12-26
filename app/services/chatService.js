import axios from "axios";

export default class API {
  constructor() {
    this.instance = axios.create({
      baseURL: `https://master--polite-sable-6474d3.netlify.app/api/v1`,
    });
  }

  createChat(body) {
    return this.instance.post("/chat", body);
  }
}
