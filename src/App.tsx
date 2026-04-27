import React from "react";
import AppRouter from "./routes/AppRouter.js";
import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js';
import ScrollToTop from "./components/common/ScrollToTop.js"; 
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="main__content">
        <AppRouter />
      </main>
      <Footer />
    </>
  );
}

export default App;
