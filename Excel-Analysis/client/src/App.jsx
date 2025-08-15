import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import AdminDashboard from "./components/AdminDashboard";
import Contact from "./components/Contact";
import { File } from "./components/File";
import Footer from './components/Footer';
import Home from "./components/Home";
import LoginPage from "./components/LoginForm";
import Nav from './components/Nav';
import SignupForm from "./components/SignupForm";


function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#000010] overflow-hidden flex items-center justify-center">

        {/* Starfield Background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 animate-[starDrift_60s_linear_infinite]"></div>

        {/* Twinkling Stars */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}

        {/* Main Content */}
        <div className="min-h-screen flex flex-col relative z-10">
          <Nav />
          <main className="flex-grow relative top-[99px]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<File />} />
              <Route path="/about" element={<Contact/>}/>
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <div className="w-full"> 
        <Footer />
          </div>
         
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes starDrift {
            0% { background-position: 0 0; }
            100% { background-position: 1000px 1000px; }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 0.2; }
          }
          .animate-twinkle {
            animation: twinkle 3s infinite ease-in-out;
          }
        `}
      </style>
    </Router>
  );
}

export default App;
