import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ResultPage() {
    const { id } = useParams();
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchResult = async () => {
            const res = await api.get(`/results/${id}`);
            setResult(res.data.result);
        };
        fetchResult();
    }, [id]);

    if (!result) return <p>Loading...</p>;

    return (
        <div>
            <h2>Score: {result.score}</h2>

            {result.answers.map((ans, index) => (
                <div key={index}>
                    <h4>{ans.questionId.questionText}</h4>

                    <p>Your Answer: {ans.selectedAnswer}</p>
                    <p>
                        Result:{" "}
                        {ans.isCorrect ? (
                            <span style={{ color: "green" }}>Correct</span>
                        ) : (
                            <span style={{ color: "red" }}>Wrong</span>
                        )}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default ResultPage;