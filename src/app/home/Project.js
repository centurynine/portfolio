import Image from "next/image";
import { projects } from "@/data/ProjectData.js";

export default function Project() {
  return (
    <>
      <section>
        <div className="mt-20 flex flex-col w-[90%] mx-auto xl:max-w-7xl">
          <div className="bg-black/35 rounded-lg p-10 border-1 border-blue-300/20">
            <div className="p-3 bg-blue-100/80 min-w inline-block rounded-full flex flex-row">
              <span className="text-sm font-medium text-blue-900/80">
                $ ~{" "}
              </span>
              <span className="text-xl font-medium text-blue-600/80">
                project
              </span>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-10">
              {projects.map((project, index) => (
                <div
                  className="  bg-base-200/70 rounded-xl shadow-md p-4  "
                  key={index}
                >
                  <div className=" flex flex-col items-center">
                    <Image
                      src={project.image}
                      alt="Eat With Me"
                      width={200}
                      height={200}
                      className=" relative w-full rounded-lg mb-4 object-cover "
                    />
                    <div className="flex flex-col   w-full">
                      <span className="text-2xl font-medium text-base-content/90 ">
                        {project.title}
                      </span>
                      <span className="text-md  text-base-content/80 ">
                        {project.description}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4 w-full">
                      {project.tags.map((tag, index) => (
                        <span className="bg-base-content/10 text-base-content/80 text-sm font-medium px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div> 
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
