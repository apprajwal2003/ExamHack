import path from "path";
import fs from "fs/promises";
import Link from "next/link";
import BackButton from "@/components/BackButton";

interface SelectorProps {
  params: Promise<{ program: string; sem: string; subject: string }>;
}

export default async function NotesPage({ params }: SelectorProps) {
  const { program, sem, subject } = await params;
  const folderPath = path.join(
    process.cwd(),
    "public",
    "notes",
    program,
    sem,
    subject
  );

  let files: string[] = [];
  try {
    const allFiles = await fs.readdir(folderPath);
    files = allFiles.filter((file) =>
      [".pdf", ".docx", ".pptx"].includes(path.extname(file).toLowerCase())
    );
  } catch {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-white mb-2">
              No Notes Found
            </h2>
            <Link
              href={`/${program}/${sem}`}
              className="mt-4 inline-flex items-center text-indigo-400 hover:text-indigo-300"
            >
              ← Back to Subjects
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex">
          <div>
            <h1 className="text-3xl font-bold text-white capitalize">
              {subject.replace(/-/g, " ")}
            </h1>
            <p className="text-gray-400">{`Resources for ${program} - Semester ${sem}`}</p>
          </div>

          <div className="justify-end ml-auto">
            <BackButton />
          </div>
        </div>

        {files.length > 0 ? (
          <div className="space-y-4">
            {files.map((file) => {
              const ext = path.extname(file).toLowerCase();
              const fileUrl = `/notes/${program}/${sem}/${subject}/${file}`;
              const isPDF = ext === ".pdf";

              // For .docx and .pptx use Google Docs Viewer
              const viewUrl = isPDF
                ? fileUrl
                : `https://docs.google.com/viewer?url=${encodeURIComponent(
                    process.env.NEXT_PUBLIC_BASE_URL + fileUrl
                  )}&embedded=true`;

              return (
                <div
                  key={file}
                  className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white capitalize">
                      {file.replace(/\.[^/.]+$/, "").replace(/-/g, " ")}
                    </span>
                    <a
                      href={viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-indigo-500/20 rounded-lg text-indigo-300 hover:bg-indigo-500/30 transition-colors"
                    >
                      View
                    </a>
                  </div>
                </div>
              );
            })}{" "}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No Files found. Add folders to{" "}
            <code>
              public/notes/{program}/{sem}/
            </code>
            .
          </div>
        )}
      </div>
    </main>
  );
}
