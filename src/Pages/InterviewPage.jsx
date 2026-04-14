import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function InterviewPage() {
    const { id } = useParams();
    const [interview, setInterview] = useState(null);
    const [answers, setAnswers] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInterview = async () => {
            const res = await api.get(`/interview/${id}`);
            setInterview(res.data.interview);
        };
        fetchInterview();
    }, [id]);

    const handleSelect = (questionId, selectedAnswer) => {
        setAnswers((prev) => {
            const existing = prev.find(a => a.questionId === questionId);

            if (existing) {
                return prev.map(a =>
                    a.questionId === questionId
                        ? { ...a, selectedAnswer }
                        : a
                );
            }

            return [...prev, { questionId, selectedAnswer }];
        });
    };

    const handleSubmit = async () => {
        try {
            const res = await api.post("/results/submit", {
                interviewId: id,
                answers
            });
            navigate(`/result/${res.data.result._id}`);
            toast.success("Interview submitted successfully");
        } catch (error) {
            toast.error("Failed to submit interview");
        }
    };

    if (!interview) return <p className="text-white p-6">Loading...</p>;

    return (
        <div className="min-h-screen bg-[#0f0f11] text-white flex flex-col">

            {/* TOP BAR */}
            <div className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
                <h2 className="font-semibold">
                    {interview.title}
                </h2>

                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 transition text-sm"
                >
                    Submit
                </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 flex justify-center px-4 py-10">

                <div className="w-full max-w-3xl space-y-10">

                    {interview.questions.map((q, qIndex) => (
                        <div key={q._id}>

                            {/* Question Header */}
                            <div className="mb-4">
                                <p className="text-sm text-gray-400 mb-1">
                                    Question {qIndex + 1} of {interview.questions.length}
                                </p>

                                <h4 className="text-lg font-medium">
                                    {q.questionText}
                                </h4>
                            </div>

                            {/* Options */}
                            <div className="space-y-3">
                                {q.options.map((opt, index) => {
                                    
                                    const selected = answers.find(
                                        a => a.questionId === q._id
                                    )?.selectedAnswer === opt;

                                    return (
                                        <div
                                            key={index}
                                            onClick={() => handleSelect(q._id, opt)}
                                            className={`px-4 py-3 rounded-lg border cursor-pointer
                                            ${selected
                                                ? "border-purple-500 bg-purple-500/10"
                                                : "border-white/10 bg-[#111]"
                                            }
                                            hover:border-purple-400 transition`}
                                        >
                                            {opt}
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
}

export default InterviewPage;