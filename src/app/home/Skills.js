import Image from "next/image";
import { skills } from "@/data/SkillData";

export function Skill() {
  const categories = {
    frontend: {
      title: "frontend",
      skills: skills.filter((skill) => skill.category === "frontend"),
    },
    backend: {
      title: "backend",
      skills: skills.filter((skill) => skill.category === "backend"),
    },
    database: {
      title: "database",
      skills: skills.filter((skill) => skill.category === "database"),
    },
  };
  return (
    <>
      <section id="skills" className="relative mt-20 p-10 xl:px-20 w-[90%] xl:max-w-6xl mx-auto bg-base-100/90 backdrop-blur-md rounded-lg overflow-hidden border-1 border-red-300/30">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-gradient-to-br from-purple-600 via-blue-500 to-teal-300 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] -left-20 w-[400px] h-[400px] bg-gradient-to-br from-purple-600 via-blue-500 to-teal-200 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-pink-100 opacity-20 rounded-full blur-3xl"></div>
        <h2 className="text-4xl font-bold mb-10 relative  ">Skills</h2>

        <div className="space-y-12 relative  ">
          {Object.values(categories).map((category, idx) => (
            <div>
              {" "}
              <div className="bg-base-100 rounded-t-lg p-3 flex items-center space-x-2 border-1 border-purple-400/50 border-b-1">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-gray-400">
                  guy@portfolio: ~/skills
                </span>
              </div>
              <div
                key={idx}
                className="mb-6 bg-black/40 p-8 rounded-b-xl shadow-lg border-1 border-purple-400/50  border-t-0"
              >
                {/* <div className="flex flex-row gap-2 ">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div> */}
                <div className="flex flex-row items-center">
                  <span className="text-xl font-semibold mb-4 text-green-300/80">
                    $ ~
                  </span>
                  <span className="ml-2 text-1xl font-semibold mb-4 text-blue-300/80">
                    {category.title}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-4 gap-6">
                  {category.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-base-200 rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform duration-300   border-2 border-transparent hover:border-blue-300/50 "
                    >
                      <div className="w-[50px] h-[50px] mb-2">
                        <Image
                          src={skill.image}
                          alt={skill.name}
                          width={50}
                          height={50}
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-lg font-semibold">{skill.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}
                      </p>
                    </div>
                  ))}
                </div>
              </div>{" "}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
