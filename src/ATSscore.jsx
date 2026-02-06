import { useState } from "react";
import { useSelector } from "react-redux";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { FaFileMedical } from "react-icons/fa";

function AtsChecker() {
  const resumeTextFromRedux = useSelector(
    (state) => state.resume.resumeText
  );
  const user = useSelector((state) => state.user.userData);

  const [resumeText, setResumeText] = useState(
    localStorage.getItem("extractedtext") || resumeTextFromRedux || ""
  );
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCheckATS = async () => {
    if (!resumeText || !jobDescription) {
      setError("Resume text and job description are required");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/user/atscheck",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeText, jobDescription }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setResult(data.data);
    } catch (err) {
      setError(err.message || "Failed to calculate ATS score");
    }

    setLoading(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-black backdrop-blur-xl">
        <div className="mx-auto flex  items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600">
              <FaFileMedical className="text-white" />
            </div>
            <span className="text-lg font-semibold text-white">
              RESUME AI
            </span>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to="/logout"
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
              >
                Logout
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden md:inline-block rounded-full bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

  
      <div className="min-h-screen bg-black px-4 py-8">
        <div className="mx-auto rounded-2xl p-6 sm:p-8 shadow-xl">

          <div className="mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              ATS Resume Score Checker
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              Compare your resume with a job description
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-white p-4">
              <h3 className="mb-2 text-center font-semibold text-black">
                Resume Text
              </h3>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here"
                className="h-72 w-full resize-none rounded-xl border p-3 text-sm outline-none"
              />
            </div>

            <div className="rounded-3xl bg-white p-4">
              <h3 className="mb-2 text-center font-semibold text-black">
                Job Description
              </h3>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here"
                className="h-72 w-full resize-none rounded-xl border p-3 text-sm outline-none"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 text-center font-medium text-red-500">
              {error}
            </p>
          )}

          {result && (
            <div className="mt-10 rounded-xl bg-gray-50 p-6">
              <div className="mb-6 text-center">
                <p className="text-gray-600">ATS Match Score</p>
                <p className="text-5xl font-bold text-emerald-600">
                  {result.score}%
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-700">
                    <CheckCircle size={18} className="text-green-600" />
                    Matched Keywords
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {result.matchedKeywords?.map((k, i) => (
                      <li key={i}>{k}</li>
                    )) || <li>No data</li>}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-700">
                    <XCircle size={18} className="text-red-600" />
                    Missing Keywords
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {result.missingKeywords?.map((k, i) => (
                      <li key={i}>{k}</li>
                    )) || <li>No data</li>}
                  </ul>
                </div>
              </div>

              {result.summary && (
                <p className="mt-6 text-center text-sm text-gray-700">
                  {result.summary}
                </p>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleCheckATS}
              disabled={loading}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 font-semibold text-white transition hover:bg-emerald-700 disabled:bg-gray-400"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Check ATS Score"
              )}
            </button>

            {result ? (
              <Link
                to="/aiedit"
                className="flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-8 font-semibold text-white transition hover:bg-indigo-700"
              >
                Optimize with AI
              </Link>
            ) : (
              <button
                disabled
                className="flex h-12 items-center justify-center rounded-xl bg-gray-400 px-8 font-semibold text-white cursor-not-allowed"
              >
                Optimize with AI
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AtsChecker;
