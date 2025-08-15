import { Link } from "react-router-dom";
import mountain2 from "../assets/mountain-2.png";
import { FlipWords } from "./FlipWords";
export default function Home() {


  return (
    <div
      className="relative min-h-screen bottom-[99px] flex flex-col items-center justify-center max-w-full px-4 sm:px-6 text-white overflow-auto"
      style={{ 
        backgroundImage: `url(${mountain2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // backgroundAttachment: "fixed",
        fontFamily: "'Inter', sans-serif",
        
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0  z-0" />

      {/* Content */}
      <div className="max-w-4xl text-center mb-8 px-4 bottom-[99px] sm:px-6 relative z-10">
        <h1
          className="font-extrabold bg-gradient-to-r from-[#38e1ff] via-[#b855ff] to-[#ff9f40] 
          bg-clip-text text-transparent "
          style={{
            letterSpacing: "0.03em",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)", // fluid text scaling
          }}
        >
          Turn Excel <FlipWords words={["POWERFUL", "ELEGANT", "INTUITIVE"]} className="text-white text-4xl md:text-6xl"  />
        </h1> 

        <p
          className="mt-4 leading-relaxed "
          style={{
            color: "#f1f5f9",
            maxWidth: "650px",
            margin: "0 auto",
            fontSize: "clamp(0.9rem, 2.5vw, 1.25rem)", 
          }}
        >
          Upload spreadsheet and instantly 
        </p>
          <p
          className="mt-4 leading-relaxed "
          style={{
            color: "#f1f5f9",
            maxWidth: "650px",
            margin: "0 auto",
            fontSize: "clamp(0.9rem, 2.5vw, 1.25rem)", 
          }}
        >
          get stunning charts,
          graphs insights📊.
        </p>
      </div>

      
    <Link to="/services">
    <button
        className="mt-6 relative sm:mt-10 px-6 sm:px-8 py-3 bottom-[90px] rounded-lg font-semibold 
        bg-gradient-to-r from-[#38e1ff] via-[#b855ff] to-[#ff9f40] 
        shadow-[0_0_25px_rgba(184,85,255,0.75)] border border-white/10
        hover:scale-105 transition-transform duration-200
        hover:shadow-[0_0_40px_rgba(56,225,255,0.9)]"
        style={{
          fontFamily: "'Poppins', sans-serif",
          backdropFilter: "blur(6px)",
          fontSize: "clamp(0.95rem, 2.5vw, 1.25rem)",
        }}
        type="button"
      >
        Try it Now →
      </button>
    </Link>
      
    </div>
  );
}
