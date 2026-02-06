import { useDispatch , useSelector } from "react-redux";
import { useState } from "react";
import { Sparkles, Download, Loader2 } from "lucide-react";
import { FaFileMedical } from "react-icons/fa";
import { setEditedResumeText } from "./slice/Resume.slice";
import { Link } from "react-router-dom";
function AiResumeEditor() {
  const dispatch = useDispatch();
  const originalText = localStorage.getItem("extractedtext")

   const user = useSelector((state) => state.user.userData);

  const [editedText, setEditedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAiEdit = async () => {
    if (!originalText) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/user/aiedit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resumeText: originalText }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

       setEditedText(data.data.editedText);
       localStorage.setItem("EditedResumeText" , data.data.editedText )
         dispatch(setEditedResumeText(data)) ;

    } catch (err) {
      setError(err.message || "AI editing failed");
    }

    setLoading(false);
  };

  const handleDownload = async () => {
    const res = await fetch(
      "http://localhost:5000/api/v1/user/docx",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText: editedText || originalText,
        }),
      }
    );

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "AI_Resume.docx";
    a.click();
  };

  return (<>
   <div className="bg-black overflow-y-hidden">
    <header className="w-full  backdrop-blur-3xl sticky top-0 z-30">
      <div className="mx-auto flex items-center justify-between px-4 py-3 md:py-4">
       
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600">
            <span className="text-lg font-semibold text-white"><FaFileMedical /></span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            RESUME AI
          </span>
        </div>
    
        <div className="flex items-center gap-3">
          {user ? (<><Link to="/register"  className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 hover:bg-indigo-700">
            Logout
          </Link></>) : (<> <Link to="/login" className="hidden text-sm font-medium text-white p-2 px-2 rounded-full bg-indigo-600 md:inline-block shadow-md shadow-indigo-500/30 hover:bg-indigo-700">
            Sign In
          </Link>
          <Link to="/register"  className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 hover:bg-indigo-700">
            Get Started
          </Link></>)}
        
        </div>
      </div>
    </header>
 
    <div className="min-h-screen  p-6">
      <div className=" mx-auto rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            AI Resume Editor
          </h1>
          <p className="text-white mt-2">
            Improve your resume with AI & download instantly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

         
          <div>
            <h3 className="font-semibold mb-2 text-white">
              Extracted Resume
            </h3>
            <div
              readOnly
              className="w-full font-inter  overflow-y-auto h-96 border rounded-xl p-4 text-sm bg-white"
            >{originalText}</div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-white">
              AI Improved Resume
            </h3>
            <div
              onChange={(e) => setEditedText(e.target.value)}
              placeholder="Click 'Improve with AI' to generate"
              className="  overflow-y-auto font-inter outline-none bg-white h-96 border rounded-xl p-4 text-sm"
            >{editedText}</div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleAiEdit}
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition disabled:bg-gray-400"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Improving...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Improve with AI
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            disabled={!editedText && !originalText}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition disabled:bg-gray-400"
          >
            <Download size={18} />
            Download Resume
          </button>
        </div>

        {error && (
          <p className="text-center mt-4 text-red-500 font-medium">
            {error}
          </p>
        )}
      </div>
    </div> 
    </div>
    </>
  );
}

export default AiResumeEditor;
