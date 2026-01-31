import { Routes, Route } from 'react-router-dom'; // <--- Import Router components

import Navbar from "./components/Navbar"; 
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

function App() {
  return (
    <main className="bg-black/100 min-h-screen w-full text-white selection:bg-purple-500 selection:text-white">
      
      {/* 1. Navbar is placed here so it appears on ALL pages */}
      <Navbar /> 

      <Routes>
        {/* 2. The Main "Home" Page (Your Scrolling Portfolio) */}
        <Route path="/" element={
          <>
            <Hero />
            <About />
            {/* Navbar was here in your snippet, but for Router/Dock setups, 
                it's usually better at the top level (line 17) or fixed via CSS */}
            <Experience />
            <Skills />
            <Projects />
            <Contact />
            <div className="h-[20vh]"></div> {/* Footer spacer */}
          </>
        } />

        {/* 3. (Optional) Example of how to add a future page */}
        {/* <Route path="/project-details/:id" element={<ProjectDetails />} /> */}
        
        {/* 4. (Optional) 404 Not Found Route */}
        <Route path="*" element={
          <div className="flex items-center justify-center h-screen text-2xl font-mono">
            404 | Page Not Found
          </div>
        } />

      </Routes>
    </main>
  );
}

export default App;