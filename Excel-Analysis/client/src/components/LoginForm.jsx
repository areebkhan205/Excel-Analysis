import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // ✅ Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        alert(`Welcome back, ${role === "admin" ? "Admin" : "User"}!`);

        // Redirect based on role
        if (role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        alert("User data not found in database.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center relative bottom-[99px] justify-center min-h-screen text-white">
      <form
        onSubmit={handleLogin}
        className="relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-85 sm:w-96 border border-white/20"
      >
        {/* Futuristic Glow Effect */}
        <div className="absolute pointer-events-none  inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-2xl"></div>

        <h1 className="relative text-3xl font-bold mb-6 text-center tracking-wide">
          Welcome Back 🚀
        </h1>

        {/* Email Input */}
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 rounded-lg bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-6 rounded-lg bg-gray-900/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 hover:shadow-blue-500/50 transition-transform"
        >
          Login
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-gray-400 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Sign up here
          </span>
        </p>
      </form>
    </div>
  );
}
