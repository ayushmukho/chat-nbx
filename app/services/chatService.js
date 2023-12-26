import axios from "axios";

export default class API {
  constructor() {
    this.instance = axios.create({
      baseURL: `https://chat-nbx.vercel.app/api/v1`,
    });
  }

  createChat(body) {
    return this.instance.post("/chat", body);
  }
}
