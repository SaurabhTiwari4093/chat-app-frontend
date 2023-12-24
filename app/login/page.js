"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const userLogin = (e) => {
    e.preventDefault();
    router.push(`/chat/${username}`);
  };

  return (
    <main className="flex justify-center items-center h-screen p-4 text-slate-700">
      <form
        onSubmit={userLogin}
        className="shadow p-4 bg-slate-50 w-full md:w-96 rounded"
      >
        <div className="text-2xl font-semibold text-center">
          Please login to start chat
        </div>
        <div className="my-4">
          <label className="text-slate-500">Create username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded py-1 px-2 border border-slate-200 outline-slate-300"
            placeholder="Enter username"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded shadow text-white"
        >
          Login
        </button>
      </form>
    </main>
  );
}

export default Login;
