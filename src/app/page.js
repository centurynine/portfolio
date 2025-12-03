import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { About } from "./home/About";
import { Skill } from "./home/Skills";
import Project from "./home/Project";
import Contact from "./home/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="pt-40"></div>
      <About />
      <Skill />
      <Project />
      <Contact />
      <div className="pb-40"></div>
    </>
  );
}
