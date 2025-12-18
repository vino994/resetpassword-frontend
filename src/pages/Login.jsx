import { useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import Toast from "../components/Toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!email || !password) {
      setMsg("All fields required");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      setMsg(res.data.msg);
      setEmail("");
      setPassword("");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast msg={msg} type={msg.includes("failed") ? "error" : "success"} />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <form onSubmit={submit} className="space-y-3">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                className="w-full border p-2 pl-10 rounded"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                className="w-full border p-2 pl-10 rounded"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded cursor-pointer flex justify-center items-center gap-2 disabled:opacity-50"
            >
              <FaSignInAlt />
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <Link className="text-indigo-600 block text-center" to="/forgot-password">
            Forgot Password?
          </Link>

          <Link className="text-indigo-600 block text-center" to="/register">
            Create new account
          </Link>
        </div>
      </div>
    </>
  );
}
