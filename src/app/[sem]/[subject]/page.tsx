import path from "path";
import fs from "fs";
import Link from "next/link";

interface SelectorProps {
  params: Promise<{ sem: string; subject: string }>;
}

export default async function SubjectPage({ params }: SelectorProps) {
  const { sem, subject } = await params;
  const formattedSubject = subject.replace(/-/g, " ");

  const folderPath = path.join(process.cwd(), "public", "notes", sem, subject);

  let files: string[] = [];
  try {
    files = fs
      .readdirSync(folderPath)
      .filter((file) =>
        [".pdf", ".docx", ".pptx"].includes(path.extname(file).toLowerCase())
      );
  } catch (error) {
    console.error("Error reading files:", error);
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 capitalize">
              {formattedSubject}
            </h1>
            <p className="text-gray-400">Semester {sem} Resources</p>
          </div>

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
              No Resources Available
            </h2>
            <p className="text-gray-400">
              There are no notes uploaded for this subject yet.
            </p>
            <Link
              href={`/${sem}`}
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-300 bg-indigo-500/20 hover:bg-indigo-500/30 transition-colors"
            >
              Back to Subjects
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 capitalize">
                {formattedSubject}
              </h1>
              <p className="text-gray-400">Semester {sem} Resources</p>
            </div>
            <Link
              href={`/${sem}`}
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Subjects
            </Link>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 divide-y divide-gray-700">
            {files.map((file) => {
              const fileName = file
                .replace(path.extname(file), "")
                .replace(/-/g, " ");
              const fileUrl = `/notes/${sem}/${subject}/${file}`;
              const isPDF = file.endsWith(".pdf");
              const fileType = path.extname(file).slice(1).toUpperCase();

              return (
                <div
                  key={file}
                  className="group hover:bg-gray-700/50 transition-colors duration-200"
                >
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`p-3 rounded-lg mr-4 ${
                          isPDF ? "bg-red-500/20" : "bg-blue-500/20"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {isPDF ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          )}
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-white capitalize">
                          {fileName}
                        </h3>
                        <p className="text-xs text-gray-500">{fileType} File</p>
                      </div>
                    </div>
                    <a
                      href={fileUrl}
                      {...(isPDF
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : { download: true })}
                      className="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                    >
                      {isPDF ? (
                        <>
                          <span className="text-red-400 group-hover:text-red-300">
                            View PDF
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1 text-red-400 group-hover:text-red-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span className="text-blue-400 group-hover:text-blue-300">
                            Download
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1 text-blue-400 group-hover:text-blue-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </>
                      )}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
