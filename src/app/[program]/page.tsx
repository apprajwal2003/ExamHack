"use server";

import fs from "fs";
import path from "path";
import Link from "next/link";
import BackButton from "@/components/BackButton";

interface Props {
  params: Promise<{ program: string }>;
}

export default async function SemestersPage({ params }: Props) {
  const { program } = await params;
  const programPath = path.join(process.cwd(), "public", "notes", program);

  let semesters: string[] = [];
  try {
    semesters = fs
      .readdirSync(programPath)
      .filter((folder) =>
        fs.statSync(path.join(programPath, folder)).isDirectory()
      )
      .sort((a, b) => Number(a) - Number(b));
  } catch (error) {
    console.error(`Error reading semesters for program ${program}:`, error);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Semesters for Program: {program.replace(/-/g, " ")}
            </h1>
            <p className="text-gray-400">
              Select your semester to view resources
            </p>
          </div>
          <div className="justify-end ml-auto">
            <BackButton />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {semesters.map((sem) => (
            <Link
              key={sem}
              href={`/${program}/${sem}`}
              className="group relative overflow-hidden rounded-2xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">
                    {sem === "6" ? "Current" : "Archived"}
                  </span>
                  <span className="text-xs font-mono text-gray-500">
                    2024-25
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Semester {sem}
                </h2>
                <p className="text-gray-400 text-sm">
                  Click to view all resources for this semester
                </p>
                <div className="mt-6 flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/30 flex items-center justify-center group-hover:bg-indigo-500/50 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-indigo-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {semesters.length === 0 && (
          <div className="mt-12 border-t border-gray-800 pt-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              No Semesters Found for {program}
            </h2>
            <p className="text-gray-500">
              Add folders inside this program folder to begin.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
