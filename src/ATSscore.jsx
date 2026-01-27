import { useState } from "react";
import { useSelector } from "react-redux";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

function AtsChecker() {
  const resumeTextFromRedux = useSelector(
    (state) => state.resume.resumeText
  );

   console.log(resumeTextFromRedux);
   

  const [resumeText, setResumeText] = useState(localStorage.getItem("extractedtext") || resumeTextFromRedux || "");
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
          body: JSON.stringify({
            resumeText,
            jobDescription,
          }),
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
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            ATS Resume Score Checker
          </h1>
          <p className="text-gray-500 mt-2">
            Compare your resume with a job description
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-gray-700">
              Resume Text
            </h3>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here"
              className="w-full h-72 border rounded-xl p-4 text-sm"
              disabled

            />
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-700">
              Job Description
            </h3>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here"
              className="w-full h-72 border rounded-xl p-4 text-sm"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleCheckATS}
            disabled={loading}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition disabled:bg-gray-400"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Analyzing...
              </>
            ) : (
              "Check ATS Score"
            )}
          </button>
        </div>

        {error && (
          <p className="text-center mt-4 text-red-500 font-medium">
            {error}
          </p>
        )}

        {result && (
          <div className="mt-10 bg-gray-50 border rounded-xl p-6">
            <div className="text-center mb-6">
              <p className="text-gray-600">ATS Match Score</p>
              <p className="text-5xl font-bold text-emerald-600">
                {result.score}%
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={18} />
                  Matched Keywords
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {result.matchedKeywords?.map((k, i) => (
                    <li key={i}>{k}</li>
                  )) || <li>No data</li>}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <XCircle className="text-red-600" size={18} />
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
              <p className="mt-6 text-sm text-gray-700 text-center">
                {result.summary}
              </p>
            )}
          </div>
        )}
      </div>
       <div className="text-center pt-6">
         {result ?(
           <Link to="/aiedit" className=" mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition disabled:bg-gray-400 " >
          Optimize with AI
        </Link>
        ) :(
           <button disabled className=" mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition disabled:bg-gray-400 ">
          Optimize with AI
        </button>
      )}
       </div>
       
    </div>

     
     </>
  );
}

export default AtsChecker;
