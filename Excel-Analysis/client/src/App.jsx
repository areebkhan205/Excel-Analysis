
import './App.css';
import { File } from './components/File';
import Footer from './components/Footer';
import Nav from './components/Nav';
function App() {
  return (
    <>


    <div className="min-h-screen bg-[#0b0b0c] flex flex-col">
      <Nav/>
      <main className="flex-grow relative top-[99px]">
   <File/>
      </main>
      <Footer />
    </div>
    </>
  );
}

export default App;
