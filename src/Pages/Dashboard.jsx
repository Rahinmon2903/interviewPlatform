import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await api.get("/interview");
    setInterviews(res.data.interviews);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f11] to-black text-white px-6 py-8">

      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Dashboard
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Start your mock interviews
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {interviews.map((i) => (
          <div
            key={i._id}
            className="bg-[#111] border border-white/10 rounded-xl p-5 
            hover:border-white/20 transition flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-medium">
                {i.title}
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                {i.role}
              </p>
            </div>

            <button
              onClick={() => navigate(`/interview/${i._id}`)}
              className="mt-6 py-2.5 rounded-md 
              bg-gradient-to-r from-purple-500 to-blue-500 
              hover:opacity-90 active:scale-[0.98] 
              transition font-medium text-sm"
            >
              Start Interview
            </button>
          </div>
        ))}

      </div>

      {/* EMPTY STATE */}
      {interviews.length === 0 && (
        <div className="text-center text-gray-400 mt-20">
          No interviews available
        </div>
      )}

    </div>
  );
}

export default Dashboard;
