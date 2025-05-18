import Image from "next/image";
import { skills } from "@/data/SkillData"; 

export function Skill() {
  return (
    <>
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Skills
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div className="bg-base-200 dark:bg-base-300 rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform duration-300">
              <div className="text-blue-500 mb-2">{skill.icon}</div>
              <h3 className="text-lg font-semibold  ">{skill.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {skill.level}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
