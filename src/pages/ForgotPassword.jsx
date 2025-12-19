import { useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import Toast from "../components/Toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMsg("Email is required");
      return;
    }

    setMsg("");

    try {
      setLoading(true);

      const res = await api.post("/auth/forgot-password", { email });

      setMsg(res.data.msg || "Password reset link sent to your email");
      setEmail("");
    } catch (err) {
      setMsg(
        err.response?.data?.msg ||
          "Unable to send reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {msg && <Toast msg={msg} />}

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">Forgot Password</h2>

          <form onSubmit={submit} className="space-y-3">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                className="w-full border p-2 pl-10 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="email"
                placeholder="Registered Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <Link
            className="text-indigo-600 text-center block hover:underline"
            to="/login"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </>
  );
}
