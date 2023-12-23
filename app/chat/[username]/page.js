"use client";
import { useEffect, useState } from "react";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:3000");

function Chat({ params }) {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const username = params.username;

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", {
      text: message,
      name: username,
    });
    setMessage("");
  };

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setChats([...chats, data]);
    });
  }, [socket, chats]);

  return (
    <main className="flex justify-center items-center h-screen p-4 text-slate-700">
      <div className="shadow bg-slate-50 w-full md:w-96 rounded h-full flex flex-col justify-between">
        <div className="flex justify-between items-center p-4 bg-slate-200 rounded-t text-xl font-semibold">
          <div>
            Chat App
          </div>
          <div className="font-normal text-base">
            {username}
          </div>
        </div>
        <div className="p-4 overflow-y-auto flex flex-col justify-start h-full">
          {chats.map((chat, key) => {
            return chat.name === username ? (
              <div key={key} className="flex justify-end">
                <div>
                  <div className="text-xs text-right">You</div>
                  <div className="p-2 bg-white mb-2 rounded w-fit min-w-32">
                    {chat.text}
                  </div>
                </div>
              </div>
            ) : (
              <div key={key}>
                <div className="text-xs">{chat.name}</div>
                <div className="p-2 bg-white mb-2 rounded w-fit min-w-32">
                  {chat.text}
                </div>
              </div>
            );
          })}
        </div>
        <form
          className="p-4 bg-slate-200 rounded-b flex gap-2"
          onSubmit={sendMessage}
        >
          <input
            type="text"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded py-1 px-2 border border-slate-200 outline-slate-500"
            placeholder="Message"
            required
          />
          <button
            type="submit"
            className="bg-slate-600 hover:bg-slate-700 px-3 py-1 rounded shadow text-slate-50"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}

export default Chat;
