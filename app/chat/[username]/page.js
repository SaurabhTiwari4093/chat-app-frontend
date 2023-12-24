"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import socketIO from "socket.io-client";

const backendUrl = "https://chat-app-backend-saurabh.onrender.com";
// const backendUrl = "http://localhost:3000";
const socket = socketIO.connect(backendUrl);

function Chat({ params }) {
  const router = useRouter();
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

  const logoutUser = () => {
    socket.disconnect();
    router.push("/");
  };

  return (
    <main className="h-screen text-slate-700 bg-slate-100 p-4 w-full flex flex-col">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold">ChatApp</div>
        <button
          onClick={logoutUser}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded shadow text-white"
        >
          Logout
        </button>
      </div>
      <div className="h-full md:grid md:grid-cols-4 py-4">
        <div className="hidden md:block col-span-1">
          <div className="font-medium text-lg">Active users</div>
          <div>Coming soon...</div>
        </div>
        <div className="col-span-3 overflow-y-auto flex flex-col justify-start bg-white rounded p-4 h-full">
          {chats.map((chat, key) => {
            return chat.name === username ? (
              <div key={key} className="flex justify-end">
                <div>
                  <div className="text-xs text-right">You</div>
                  <div className="p-2 mb-2 rounded-xl rounded-tr-none w-fit min-w-32 bg-yellow-100">
                    {chat.text}
                  </div>
                </div>
              </div>
            ) : (
              <div key={key}>
                <div className="text-xs">{chat.name}</div>
                <div className="p-2 mb-2 rounded-xl rounded-tl-none w-fit min-w-32 bg-blue-100">
                  {chat.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="md:grid md:grid-cols-4">
        <div className="hidden md:block col-span-1" />
        <form
          className="col-span-3 rounded-b flex gap-2"
          onSubmit={sendMessage}
        >
          <input
            type="text"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded py-1 px-2 border border-slate-200 outline-slate-300"
            placeholder="Message"
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded shadow text-white"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}

export default Chat;
