import logo from '../assets/logo.png';
function Nav() {
    return (
        <>
        <div className='w-full py-2  text-white'>
            <nav className='flex items-center px-6 justify-between'> 
  <img className='h-[40px] w-[10px]' src={logo} alt="logo img" />
<ul className='flex font-medium  items-center gap-[70px] justify-between'>
<li>Home</li>
<li>Services</li>
<li>About</li>
</ul>

<button className='bg-slate-400 p-[10px] cursor-pointer rounded-2xl'>
    Sign Up
</button>

            </nav>
        </div>
        
        </>
    )
}

export default Nav
