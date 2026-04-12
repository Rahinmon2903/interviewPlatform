import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [interviews, setInterviews] = useState([]);

  const fetchData = async () => {
    const res = await api.get("/interview");
    setInterviews(res.data.interviews);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {interviews.map((i) => (
        <div key={i._id}>
          <h3>{i.title}</h3>
          <p>{i.role}</p>
            <button onClick={() => navigate(`/interview/${i._id}`)}>
            Start Interview
        </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
