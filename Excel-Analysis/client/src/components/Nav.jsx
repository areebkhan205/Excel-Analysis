import logo from '../assets/logo.png';

function Nav() {
    return (
        <>
        <div className='w-full py-2  text-white'>
            <nav className='flex items-center px-9  justify-between'> 
  <img className='h-[40px] w-[10px]' src={logo} alt="logo img" />
<ul className='hidden md:flex    cursor-pointer  font-Poppins  items-center gap-[170px] justify-between'>
<li className='   hover:text-purple-400 transition-all duration-300 ease-in-ou hover:ease hover:scale-120'>Home</li>
<li className='hover:text-purple-400 transition-all duration-300 ease-in-ou hover:ease hover:scale-120'>Services</li>
<li className='hover:text-purple-400 transition-all duration-300 ease-in-ou hover:ease hover:scale-120'>About</li>
</ul>

<button className= 'bg-slate-600  font-medium shadow-4xl px-6  transition-all duration-300 ease-in-ou hover:ease hover:scale-120 p-[5px] cursor-pointer rounded-2xl'>
    SignUp
</button>

            </nav>
        </div>
        
        </>
    )
}

export default Nav
