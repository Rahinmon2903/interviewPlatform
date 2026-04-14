import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function ResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      const res = await api.get(`/results/${id}`);
      setResult(res.data.result);
    };
    fetchResult();
  }, [id]);

  if (!result) return <p className="text-white p-6">Loading...</p>;

  const total = result.answers.length;
  const correct = result.answers.filter((a) => a.isCorrect).length;
  const percentage = Math.round((correct / total) * 100);

  //  Performance Message
  let message = "Keep practicing!";
  if (percentage >= 80) message = "Excellent performance 🚀";
  else if (percentage >= 60) message = "Good job 👍";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f11] to-black text-white px-6 py-10">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-semibold">Interview Result</h1>
        <p className="text-gray-400 text-sm mt-2">{message}</p>
      </div>

      {/* SCORE CARD */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="bg-[#111] border border-white/10 rounded-xl p-8 text-center">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            {percentage}%
          </h2>

          <p className="text-gray-400 mt-2">
            {correct} out of {total} correct
          </p>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full h-2 bg-white/10 rounded-full">
              <div
                className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="max-w-4xl mx-auto flex gap-4 mb-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex-1 py-3 rounded-lg bg-[#111] border border-white/10 hover:border-white/20 transition"
        >
          Back to Dashboard
        </button>

        <button
          onClick={() => {
            const interviewId =
              typeof result.interviewId === "object"
                ? result.interviewId._id
                : result.interviewId;

            navigate(`/interview/${interviewId}`);
          }}
          className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition font-medium"
        >
          Try Again
        </button>
      </div>

      {/* ANSWERS */}
      <div className="max-w-4xl mx-auto space-y-6">
        {result.answers.map((ans, index) => (
          <div
            key={index}
            className="bg-[#111] border border-white/10 rounded-xl p-6"
          >
            {/* Question */}
            <h4 className="text-lg font-medium mb-4">
              {index + 1}. {ans.questionId.questionText}
            </h4>

            {/* Answer Row */}
            <div className="flex justify-between items-center text-sm">
              <div>
                <span className="text-gray-400">Your Answer: </span>
                <span className="text-white">{ans.selectedAnswer}</span>
              </div>

              {/* Result Badge */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium
                                ${
                                  ans.isCorrect
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                                }`}
              >
                {ans.isCorrect ? "Correct" : "Wrong"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultPage;
