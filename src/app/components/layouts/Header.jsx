import { FiMessageCircle } from "react-icons/fi";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/10 shadow-sm rounded-md mb-6">
      <div className="flex items-center gap-3">
        <FiMessageCircle size={24} className="text-white" />
        <h1 className="text-xl font-semibold tracking-wide text-white">
          Feedback Dashboard
        </h1>
      </div>
      
      <div className="flex items-center gap-3">
        <p className="text-sm text-white/70 hidden sm:block">Hello, Admin</p>
        <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </header>
  );
}
