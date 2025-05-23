import fs from "fs";
import path from "path";
import Link from "next/link";
import BackButton from "@/components/BackButton";

interface SubjectSelectorProps {
  params: Promise<{ program: string; sem: string }>;
}

export default async function SubjectSelector({
  params,
}: SubjectSelectorProps) {
  const { program, sem } = await params;
  const subjectsPath = path.join(
    process.cwd(),
    "public",
    "notes",
    program,
    sem
  );

  let subjects: string[] = [];
  try {
    subjects = fs
      .readdirSync(subjectsPath)
      .filter((item) =>
        fs.statSync(path.join(subjectsPath, item)).isDirectory()
      )
      .sort((a, b) => a.localeCompare(b));
  } catch (error) {
    console.error(`Failed to load subjects for ${program}/${sem}:`, error);
  }

  const beautify = (slug: string) =>
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Subjects for {beautify(program)} - Semester {sem}
            </h1>
            <p className="text-gray-400">Select a subject to view resources</p>
          </div>
          <div className="justify-end ml-auto">
            <BackButton />
          </div>
        </div>

        {subjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Link
                key={subject}
                href={`/${program}/${sem}/${subject}`}
                className="group relative overflow-hidden rounded-2xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 h-full flex flex-col">
                  <h2 className="text-xl font-bold text-white mb-2">
                    {beautify(subject)}
                  </h2>
                  <p className="text-gray-400 text-sm mt-auto">
                    Click to view subject resources
                  </p>
                  <div className="mt-4 flex justify-end">
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
        ) : (
          <div className="text-center text-gray-500">
            No subjects found. Add folders to{" "}
            <code>
              public/notes/{program}/{sem}
            </code>
            .
          </div>
        )}
      </div>
    </main>
  );
}
