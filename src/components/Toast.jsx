export default function Toast({ msg, type = "success" }) {
  if (!msg) return null;

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 rounded shadow text-white z-50
        ${type === "error" ? "bg-red-500" : "bg-green-600"}`}
    >
      {msg}
    </div>
  );
}
