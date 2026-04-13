import { useState, useEffect } from "react";
import api from "../../services/api";

function AddQuestion() {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [interviewId, setInterviewId] = useState("");
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await api.get("/interview");
        setInterviews(res.data.interviews);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInterviews();
  }, []);

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSubmit = async () => {
    try {
      await api.post("/questions/add", {
        questionText,
        options,
        correctAnswer,
        type: "mcq",
        interviewId,
      });

      alert("Question Added");

      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      setInterviewId("");
    } catch (err) {
      alert("Error adding question");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white flex">

      {/* LEFT */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-16 border-r border-white/10">
        <h1 className="text-4xl font-semibold">
          Build your <br />
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            interview question
          </span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-md">
          Create realistic MCQs with clearly defined answers.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-10">
        <div className="w-full max-w-xl space-y-6">

          {/* SECTION: INTERVIEW */}
          <div>
            <p className="text-xs text-gray-500 mb-2">INTERVIEW</p>
            <select
              value={interviewId}
              onChange={(e) => setInterviewId(e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-lg
              focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
            >
              <option value="">Select Interview</option>
              {interviews.map((i) => (
                <option key={i._id} value={i._id}>
                  {i.title} - {i.role}
                </option>
              ))}
            </select>
          </div>

          {/* SECTION: QUESTION */}
          <div>
            <p className="text-xs text-gray-500 mb-2">QUESTION</p>
            <textarea
              rows="3"
              placeholder="Write your question..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-lg
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>

          {/* SECTION: OPTIONS */}
          <div>
            <p className="text-xs text-gray-500 mb-3">OPTIONS</p>

            <div className="space-y-3">
              {options.map((opt, i) => {
                const label = String.fromCharCode(65 + i);
                const isSelected = correctAnswer === label;

                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border
                    ${isSelected
                      ? "border-purple-500 bg-purple-500/10 scale-[1.01]"
                      : "border-white/10 bg-[#111]"
                    }
                    hover:border-purple-400 transition-all duration-200`}
                  >
                    <button
                      type="button"
                      onClick={() => setCorrectAnswer(label)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
                      ${isSelected
                        ? "bg-purple-500 text-white"
                        : "border border-gray-500 text-gray-400"}
                      `}
                    >
                      {isSelected ? "✓" : label}
                    </button>

                    <input
                      value={opt}
                      onChange={(e) => handleOptionChange(i, e.target.value)}
                      placeholder={`Option ${label}`}
                      className="flex-1 bg-transparent outline-none"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg
            bg-gradient-to-r from-purple-500 to-blue-500
            hover:shadow-lg hover:shadow-purple-500/20
            active:scale-[0.97]
            transition-all duration-200 font-semibold"
          >
            Save Question
          </button>

        </div>
      </div>

    </div>
  );
}

export default AddQuestion;