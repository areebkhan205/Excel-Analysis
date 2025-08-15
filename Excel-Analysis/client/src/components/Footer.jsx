import fot from '../assets/thunder-svgrepo-com.svg';
function Footer() {
  return (
    <footer id="contact" className="relative bottom-0  ">
      {/* Gradient Overlay */}
      <div className="absolute inset-1  bg-gradient-to-b from-transparent to-purple-900/30 "></div>

      {/* Footer Content */}
      <div className="relative border-t border-gray-800/50 backdrop-blur-sm py-2 h-[101px]  w-[1457px] bg-black/50">
        <div className="container mx-auto px-4 py-0">

        
       

          {/* 👣 Footer Note */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <img
                src={fot}
                alt="Thunder"
                width="20"
                height="20"
                className="inline transform rotate-6 scale-110"
              />
              <span>by Areeb Khan</span>
            </div>
            <p className="text-sm text-gray-500">
              © 2025<br />All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
