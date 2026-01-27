import { Download } from "lucide-react";

function clean(text = "") {
  return text
    .replace(/\*\*/g, "")
    .replace(/•/g, "• ")
    .replace(/---/g, "")
    .trim();
}

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mt-10 mb-4">
      <div className="h-[2px] w-8 bg-orange-600" />
      <h2 className="text-sm font-bold uppercase tracking-widest text-orange-600">
        {children}
      </h2>
    </div>
  );
}

export default function ResumePremiumTemplate() {
  const resumeText = localStorage.getItem("EditedResumeText") || "";

  if (!resumeText.trim()) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No resume content found
      </div>
    );
  }

  const name = resumeText.split("\n")[0] || "Your Name";
  const role = resumeText.split("\n")[1] || "Your Job Title";

  const summary = resumeText.match(/SUMMARY([\s\S]*?)WORK EXPERIENCE/i)?.[1];
  const experience = resumeText.match(/WORK EXPERIENCE([\s\S]*?)SKILLS/i)?.[1];
  const skills = resumeText.match(/SKILLS([\s\S]*?)EDUCATION/i)?.[1];
  const education = resumeText.match(/EDUCATION([\s\S]*?)OTHER/i)?.[1];
  const other = resumeText.match(/OTHER([\s\S]*)$/i)?.[1];

  const handleDownload = async () => {
    const res = await fetch("http://localhost:5000/api/v1/user/docx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Premium_ATS_Resume.docx";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-14 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-12">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            {name.split(" ")[0]}{" "}
            <span className="text-orange-600">
              {name.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">
            {role}
          </p>
        </div>

        {/* CONTACT */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700 border-b pb-5 mb-6">
          <span>📍 Any City</span>
          <span>📞 123-456-7890</span>
          <span>✉️ hello@email.com</span>
          <span>🌐 portfolio.com</span>
        </div>

        {/* SUMMARY */}
        {summary && (
          <>
            <SectionTitle>Summary</SectionTitle>
            <p className="text-sm text-gray-800 leading-relaxed">
              {clean(summary)}
            </p>
          </>
        )}

        {/* EXPERIENCE */}
        {experience && (
          <>
            <SectionTitle>Work Experience</SectionTitle>
            <div className="space-y-4 text-sm text-gray-800 leading-relaxed">
              {clean(experience)
                .split("\n")
                .filter(Boolean)
                .map((line, i) => (
                  <p key={i} className={line.match(/Jan|Feb|Mar|Apr|202|Present/)
                    ? "font-semibold text-gray-900"
                    : ""}>
                    {line}
                  </p>
                ))}
            </div>
          </>
        )}

        {/* SKILLS */}
        {skills && (
          <>
            <SectionTitle>Skills</SectionTitle>
            <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-gray-800">
              {clean(skills)
                .split("\n")
                .filter(Boolean)
                .map((skill, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                    {skill.replace(/^[-•]\s*/, "")}
                  </div>
                ))}
            </div>
          </>
        )}

        {/* EDUCATION */}
        {education && (
          <>
            <SectionTitle>Education</SectionTitle>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
              {clean(education)}
            </pre>
          </>
        )}

        {/* OTHER */}
        {other && (
          <>
            <SectionTitle>Additional Information</SectionTitle>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
              {clean(other)}
            </pre>
          </>
        )}

        {/* DOWNLOAD */}
        <div className="flex justify-end mt-12">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-md text-sm font-semibold shadow-md"
          >
            <Download size={16} />
            Download Resume
          </button>
        </div>
      </div>
    </div>
  );
}
