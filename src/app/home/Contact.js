"use client";
import { useState } from "react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("Your message has been sent successfully!");
        e.target.reset();
      } else {
        setMessage(
          "There was an error sending your message. Please try again."
        );
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="mt-20  w-[90%] xl:max-w-7xl  mx-auto p-10 bg-white/5    border border-blue-600/10 rounded-xl shadow-lg">
          <div className="justify-center flex flex-col w-[40%]">
            <form onSubmit={handleSubmit}>
              <span className="text-3xl text-blue-500 mb-8">
                ~/ Get in Touch
              </span>
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend">What is your name?</legend>
                <input
                  type="text"
                  name="name"
                  className="input bg-black/10 border-0 w-full"
                  placeholder="Type here"
                />
                <legend className="fieldset-legend">Email</legend>
                <input
                  type="email"
                  name="email"
                  className="input bg-black/10 border-0 w-full"
                  placeholder="Type here"
                />
                <legend className="fieldset-legend">Message</legend>
                <textarea
                  name="message"
                  className="textarea bg-black/10 border-0 w-full"
                  placeholder="Type here"
                ></textarea>
              </fieldset>

              <button className="btn btn-soft mt-4 w-full" disabled={loading}>Send!</button>
              {loading ? "Sending..." : null}
              {message && <p className="mt-2 text-sm">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
