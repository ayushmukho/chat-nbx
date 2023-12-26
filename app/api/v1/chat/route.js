import axios from "axios";
export const POST = async (req, res) => {
  try {
    const jsonBody = await req.json();
    const { inputMessage } = jsonBody;

    let data = JSON.stringify({
      temperature: 0.5,
      messages: [
        {
          role: "user",
          content: inputMessage,
        },
      ],
      model: "mistral-v0.2-7b-inst-8k",
      stream: false,
      max_tokens: 1000,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://chat.nbox.ai/api/chat/completions",
      headers: {
        Authorization: process.env.NBX_KEY,
        "Content-Type": "application/json",
        Cookie: "GCLB=CNHXubTQ1vfuhQE",
      },
      data: data,
    };

    let response = await axios.request(config);
    response = JSON.stringify(response.data);
    return Response.json({ data: response, success: true });
  } catch (error) {
    console.log("ERROR IN the resposne", error);
    return Response.json({ data: [], success: false });
  }
};
