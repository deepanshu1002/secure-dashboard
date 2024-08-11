import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard!</h1>
      <p className="mt-4">Only authenticated users can see this page.</p>
    </div>
  );
};

export default Dashboard;
