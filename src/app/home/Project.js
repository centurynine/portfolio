import Image from "next/image";
import { projects } from "@/data/ProjectData.js";

export default function Project() {
  return (
    <>
      

        <section
              id="projects"
              className="relative mt-20   w-[90%] xl:max-w-7xl mx-auto   "
            >
              <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-gradient-to-br from-purple-600 via-blue-500 to-teal-300 opacity-20 rounded-full blur-3xl"></div> 
              <div className="absolute -bottom-10 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-pink-100 opacity-20 rounded-full blur-3xl"></div>
              <div className="space-y-12 relative   rounded-lg shadow-lg">
                <div>
                  <div className="bg-base-100 rounded-t-lg p-3 flex items-center space-x-2  border-1 border-b-0 border-blue-300/20">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-sm text-gray-400">
                      guy@portfolio: ~/projects
                    </span>
                  </div>
                  <div className="bg-black/35 backdrop-blur-md rounded-b-lg backdrop-blur-md hover border-1 border-blue-300/20"> 
                   <div className="grid grid-cols-2 gap-6 mt-10 p-10">
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
                        <span  key={index} className="bg-base-content/10 text-base-content/80 text-sm font-medium px-2 py-1 rounded-full">
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
              </div> 
            </section>

            
    </>
  );
}
