import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-pink-200 via-purple-200 to-pink-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-9xl font-extrabold text-pink-700 mb-6 drop-shadow-lg animate-pulse">
          404
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-purple-700 mb-6">
          Oops! Page Not Found
        </p>
        <p className="text-pink-600 mb-8">
          The page you’re looking for doesn’t exist. 🌸
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105"
        >
          Go Back Home
        </button>
      </motion.div>
    </div>
  );
}
