"use client";
import { useState } from "react";
import API from "./services/chatService";
export default function Home() {
  const [messages, setMessages] = useState([
    {
      msg: "",
      received: false,
      date: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(Date.now()),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [creatChatLoading, setCreateChatLoading] = useState(false);
  const chatServiceAPI = new API();

  const handleChat = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setInputMessage("");
    setMessages((prev) => [
      ...prev,
      {
        msg: inputMessage,
        received: false,
        date: new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(Date.now()),
      },
    ]);
    setCreateChatLoading(true);
    const res = await chatServiceAPI.createChat({
      inputMessage,
    });
    if (res.data.success) {
      const msgData = JSON.parse(res.data.data);
      setMessages((prev) => [
        ...prev,
        {
          msg: msgData?.choices[0].message.content,
          received: true,
          date: new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(Date.now()),
        },
      ]);
    }

    setCreateChatLoading(false);
  };
  return (
    <div className="flex justify-center items-center w-full h-screen flex-col">
      <div className="bg-[#2f3747] w-3/4 h-3/4 p-10">
        <div>Chatz</div>
        <div className="h-5/6 mt-10 overflow-y-auto w-full flex flex-col">
          {messages.map((msgs, idx) =>
            !msgs.received && msgs.msg !== "" ? (
              <>
                <div className="flex flex-row-reverse mt-10">User</div>
                <div className="w-full flex flex-row-reverse mr-0" key={idx}>
                  <div className="bg-[#3376f6] w-64 p-3 rounded-md">
                    {msgs.msg}
                  </div>
                </div>
                <div className="flex flex-row-reverse text-xs">{msgs.date}</div>
              </>
            ) : (
              msgs.msg !== "" && (
                <div>
                  AI
                  <div key={idx} className="bg-[#3376f6] w-96 p-3 rounded-md">
                    {msgs.msg}
                  </div>
                  <div className="flex  text-xs">{msgs.date}</div>
                </div>
              )
            )
          )}
        </div>
        <div className="flex mt-10 justify-center items-center">
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your Message"
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-[#94e3d9] focus:outline-0 disabled:border-0 disabled:bg-blue-green-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            />
            <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-[#94e3d9] after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#94e3d9] peer-focus:after:scale-x-100 peer-focus:after:border-[#94e3d9] peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Type your Message
            </label>
          </div>
          <button
            disabled={creatChatLoading}
            onClick={handleChat}
            className={`
              ml-10 bg-[#94e3d9] p-2 rounded-lg text-black cursor-pointer 
                ${creatChatLoading && " opacity-20"}`}
          >
            {!creatChatLoading ? "Send" : "Loading.."}
          </button>
        </div>
      </div>
    </div>
  );
}
