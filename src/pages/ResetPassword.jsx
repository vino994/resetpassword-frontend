import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../utils/api";
import Toast from "../components/Toast";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError(false);

    if (password.length < 6) {
      setMsg("Password must be at least 6 characters");
      setError(true);
      return;
    }

    try {
      setLoading(true);
      const res = await api.post(`/auth/reset-password/${token}`, { password });
      setMsg(res.data.msg);
      setPassword("");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Reset link invalid or expired");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {msg && <Toast msg={msg} type={error ? "error" : "success"} />}

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">Reset Password</h2>

          <form onSubmit={submit} className="space-y-3">
            <input
              type="password"
              placeholder="New Password"
              className="w-full border p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded cursor-pointer disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
