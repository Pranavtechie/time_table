import React, { useState } from "react";

export default function GetCredentials() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );
    const data = await response.json();
    if (data.error) {
      setError(data.error);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-6xl text-center text-blue-500">Time Table</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center h-screen">
            <label className="text-xl text-blue-500">Username</label>
            <input
              className="w-full p-2"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="text-xl text-blue-500">Password</label>
            <input
              className="w-full p-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full p-2 bg-blue-500 text-white" type="submit">
              Login
            </button>
          </div>
        </form>
        {loading && <div className="text-xl text-blue-500">Loading...</div>}
        {error && <div className="text-xl text-blue-500">{error}</div>}
        {success && <div className="text-xl text-blue-500">Success!</div>}
      </div>
    </div>
  );
}
