import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { About } from "./home/About";
import { Skill } from "./home/Skills";
import Project from "./home/Project";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="pt-40"></div>
      <About />
      <Skill />
      <Project />
      <div className="pb-40"></div>
    </>
  );
}
