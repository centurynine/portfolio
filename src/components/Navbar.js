"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function Navbar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    }
  }, []);

  const handleThemeChange = (e) => {
    const newTheme = e.target.checked ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div>
      <nav className="fixed w-full flex justify-center z-50">
        <ul className="flex w-[94%] max-w-5xl mt-4 p-3 bg-base-100/90 backdrop-blur-md shadow-lg rounded-lg menu menu-horizontal items-center justify-between gap-3">
          <li className="text-xl sm:text-2xl font-bold">
            <Link href="/" className="cursor-pointer">
              Portfolio
            </Link>
          </li>
          <div className="flex flex-wrap justify-center gap-1 sm:gap-3 text-sm sm:text-base">
            <li>
              <Link href="/#about" className="cursor-pointer">
                About
              </Link>
            </li>
            <li>
              <Link href="/#skills" className="cursor-pointer">
                Skills
              </Link>
            </li>
            <li>
              <Link href="/#projects" className="cursor-pointer">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/app" className="cursor-pointer">
                MyApp
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="cursor-pointer">
                Contact
              </Link>
            </li>
          </div>
          <label className="toggle text-base-content cursor-pointer">
            <input
              type="checkbox"
              onChange={handleThemeChange}
              checked={theme === "dark"}
              className="theme-controller"
            />
            <Sun aria-label="sun" size={18} />
            <Moon aria-label="moon" size={18} />
          </label>
        </ul>
      </nav>
    </div>
  );
}
