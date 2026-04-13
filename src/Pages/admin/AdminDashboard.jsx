// pages/admin/AdminDashboard.jsx
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="space-y-4 w-[250px]">
        <button
          onClick={() => navigate("/admin/create-interview")}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          Create Interview
        </button>

        <button
          onClick={() => navigate("/admin/add-question")}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Add Question
        </button>
      </div>

    </div>
  );
}

export default AdminDashboard;