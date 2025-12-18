import { useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import Toast from "../components/Toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (password.length < 6) {
      setMsg("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/register", { email, password });
      setMsg(res.data.msg);
      setEmail("");
      setPassword("");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast msg={msg} type={msg.includes("failed") ? "error" : "success"} />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">Register</h2>

          <form onSubmit={submit} className="space-y-3">
            <input
              className="w-full border p-2 rounded"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="w-full border p-2 rounded"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded cursor-pointer flex justify-center items-center gap-2 disabled:opacity-50"
            >
              <FaUserPlus />
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <Link className="text-indigo-600 text-center block" to="/login">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </>
  );
}
