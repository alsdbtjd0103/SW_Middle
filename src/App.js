import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindPage from "./pages/FindPage";
import MainPage from "./pages/MainPage";
import {AnimatePresence} from 'framer-motion';
import UserContextProvider from "./store/UserContext";
import { useEffect } from "react";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  
  return (
    <div className=" bg-seoul">
    <UserContextProvider>
      <AnimatePresence onExitComplete={true}>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/find' element={<FindPage />} />
          
        </Routes>
      </BrowserRouter>
      </AnimatePresence>
    </UserContextProvider>
    </div>
  );
}

export default App;
