import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";


function CreateInterview() {
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      await api.post("/interview/create", {
        title,
        role,
        difficulty,
      });
      toast.success("Interview created successfully");
      navigate("/admin/add-question");
    } catch {
      toast.error("Failed to create interview");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white px-6 py-10">

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT SIDE (CONTENT) */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-semibold leading-tight">
            Create a new <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              interview session
            </span>
          </h1>

          <p className="mt-6 text-gray-400">
            Set up your interview with the right role and difficulty level.
            This helps you practice in a structured and focused way.
          </p>

          <div className="mt-10 space-y-3 text-sm text-gray-300">
            <p>✔ Tailored practice experience</p>
            <p>✔ Role-specific questions</p>
            <p>✔ Difficulty-based learning</p>
          </div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="flex items-center">
          <div className="w-full">

            <div className="space-y-6">

              {/* Title */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Interview Title
                </label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg
                  focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                  hover:border-white/20 outline-none transition"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Role
                </label>
                <input
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-white/10 rounded-lg
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                  hover:border-white/20 outline-none transition"
                />
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Difficulty
                </label>
                <select
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0f0f11] border border-white/10 rounded-lg
                  focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                  hover:border-white/20 outline-none transition"
                >
                  <option value="">Select Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

            </div>

            {/* BUTTON */}
            <button
              onClick={handleCreate}
              className="w-full mt-8 py-3 rounded-lg
              bg-gradient-to-r from-purple-500 to-blue-500
              hover:opacity-90 active:scale-[0.98]
              transition font-medium"
            >
              Create Interview
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default CreateInterview;