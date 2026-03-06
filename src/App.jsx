import AppRouter from "./routes/AppRouter" 
import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main className="main__content">
        <AppRouter />
      </main>
      <Footer />
    </>
  )
}

export default App
