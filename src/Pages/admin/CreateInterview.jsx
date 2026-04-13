import { useState } from "react";
import api from "../../services/api.js";
import { toast } from "react-toastify";


function CreateInterview() {
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleCreate = async () => {
    try {
      await api.post("/interview/create", {
        title,
        role,
        difficulty,
      });
      toast.success("Interview created successfully");
    } catch {
      toast.error("Failed to create interview");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-[350px]">
        
        <h2 className="text-xl font-bold mb-4">Create Interview</h2>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Role"
          onChange={(e) => setRole(e.target.value)}
        />

        <select
          className="w-full border p-2 mb-3"
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          onClick={handleCreate}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          Create
        </button>

      </div>
    </div>
  );
}

export default CreateInterview;