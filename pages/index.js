import React, { useState } from "react";
import Image from "next/image";
import Spinner from "../components/spinner";

export default function GetCredentials() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    openCaptchaModal(checked);
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
      setImageSrc(data?.imageSrc);
      setSuccess(true);
    }
    setLoading(false);
  };

  function openCaptchaModal(currentState) {
    setChecked(!currentState);
  }

  return (
    <div className="">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Time Table</h1>
            <p className="py-6">
              Login to view your timetable and find empty slots with your
              friends to get together.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Registration Number
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="21BAI0000"
                    className="input input-bordered"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toUpperCase())}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span
                      className="label-text text-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    >
                      Password
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="password"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="">
        <input
          type="checkbox"
          id="my-modal-2"
          className="modal-toggle hidden"
          onChange={(e) => openCaptchaModal(e.target.value)}
          checked={checked}
        />
        <div className="modal">
          <div className="modal-box">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <p>Please enter the text from the captcha below to login.</p>
                <Image
                  src={imageSrc || "https://picsum.photos/200/300"}
                  alt="captcha"
                  height={45}
                  width={180}
                />
                <input type="text" />
              </>
            )}
            <div className="modal-action">
              <label htmlFor="my-modal-2" className="btn btn-primary">
                Accept
              </label>
              <label htmlFor="my-modal-2" className="btn">
                Close
              </label>
            </div>
          </div>
        </div>
        {loading && <div className="text-xl text-blue-500">Loading...</div>}
        {error && <div className="text-xl text-blue-500">{error}</div>}
        {success && <div className="text-xl text-blue-500">Success!</div>}
      </div>
    </div>
  );
}
