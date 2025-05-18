"use client";
import { useEffect, useState } from "react";

export function About() {
  const positionText = "Frontend Developer";
  const [typedText, setTypedText] = useState("F");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    if (!isDeleting && typedText.length < positionText.length) {
      timer = setTimeout(() => {
        setTypedText(positionText.slice(0, typedText.length + 1));
      }, 150);
    } else if (!isDeleting && typedText.length === positionText.length) {
      timer = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && typedText.length > 1) {
      timer = setTimeout(() => {
        setTypedText(positionText.slice(0, typedText.length - 1));
      }, 50);
    } else if (isDeleting && typedText.length === 1) {
      timer = setTimeout(() => setIsDeleting(false), 500);
    }
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, positionText]);

  return (
    <>
      <div
        id="about"
        className="flex flex-col xl:flex-row  mt-20 w-[90%] xl:w-[60%] justify-center mx-auto"
      >
        <div className="flex flex-row">
          <div className="flex flex-col justify-center ">
            <span className="text-5xl mb-4">Hello</span>
            <div className="flex flex-row  items-center ">
              <span className="text-7xl mb-4">I'm Guy</span>
            </div>

            <span className="text-5xl font-bold text-blue-300 min-w-[18ch] inline-block">
              {typedText}
            </span>
          </div>
        </div>
        <div className="mt-20">
          <div className="flex flex-row justify-center xl:w-150">
            <div className="bg-black/40 p-8 rounded-xl shadow-lg border-1 border-blue-300">
              <div className="flex flex-row gap-2 mb-4">
                <div className="w-5 h-5 bg-red-100 rounded-full"></div>
                <div className="w-5 h-5 bg-yellow-100 rounded-full"></div>
                <div className="w-5 h-5 bg-blue-200 rounded-full"></div>
              </div>
              <div className="flex flex-col">
                {" "}
                <span className="text-sm text-accent">
                  saran_wanphunga@portfolio: ~/about
                </span>
                <span className="text-lg text-white">
                  I'm a passionate frontend developer with a strong eye for
                  design and usability. I thrive on transforming creative ideas
                  into engaging, responsive, and user-friendly web applications
                  that not only look great but also perform seamlessly.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
