import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";


function InterviewPage() {
    const { id } = useParams();
    const [interview, setInterview] = useState(null);
    const [answers, setAnswers] = useState([]);

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
       //short cut for [
 // { questionId: "123", selectedAnswer: "JavaScript" },
  //{ questionId: "124", selectedAnswer: "React" }
//]
            return [...prev, { questionId, selectedAnswer }];
        });
    };

    const handleSubmit = async () => {
        try {
            const res =await api.post("/results/submit", {
                interviewId: id,
                answers
            });
            navigate(`/result/${res.data.result._id}`);
            toast.success("Interview submitted successfully");

            
        } catch (error) {
            toast.error("Failed to submit interview");
        }
    };

    if (!interview) return <p>Loading...</p>;

    return (
        <div>
            <h2>{interview.title}</h2>

            {interview.questions.map((q) => (
                <div key={q._id}>
                    <h4>{q.questionText}</h4>

                    {q.options.map((opt, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                name={q._id}
                                onChange={() => handleSelect(q._id, opt)}
                            />
                            {opt}
                        </div>
                    ))}
                </div>
            ))}

            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default InterviewPage;