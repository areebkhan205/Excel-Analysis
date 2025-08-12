import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/Excel-logo.png';
import { auth } from "../firebase";

function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            console.log("User logged out");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className='w-full py-2 text-white'>
            <nav className='flex items-center px-66 sm:px-9  justify-evenly gap-[0px]  md:gap-[180px]'> 
                <img className='h-[40px] w-auto' src={logo} alt="logo img" />

                <ul className='hidden md:flex cursor-pointer  font-Poppins items-center  gap-12  '>
                    <li className="transition-transform duration-200 ease-out hover:scale-130"><Link to="/">Home</Link></li>
                    <li className="transition-all hover:scale-120 delay-130"><Link to="/services">Services</Link></li>
                    <li className="transition-all hover:scale-120 delay-140"><Link to="/about">About</Link></li>

         
                </ul>


                           {!user ? (
                        // Show Sign Up if not logged in
                        <Link
                            to="/signup"
                            className='rounded-full p-2 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition duration-300 cursor-pointer '
                        >
                            Sign Up
                        </Link>
                    ) : (
                        // Show Logout if logged in
                        <button
                            onClick={handleLogout}
                            className='bg-red-600 font-medium shadow-4xl px-6 py-2 transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer rounded-2xl'
                        >
                            Log Out
                        </button>
                    )}
            </nav>
        </div>
    );
}

export default Nav;
