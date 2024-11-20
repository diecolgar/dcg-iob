import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Wallet from "../pages/Wallet";
import Navbar from "../components/Navbar"; // Importar el nuevo Navbar

function App() {
  return (
    <Router>
      <main className="flex flex-col min-h-screen bg-gray-100 text-gray-800 h-screen justify-between items-center">
        <Navbar />
        <div className="container mx-auto py-8 h-full">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/wallet" element={<Wallet />} />
          </Routes>
        </div>
        <footer className="bg-gray-200 text-center py-4 mt-8 w-max-w px-8 rounded-full mb-4">
          <p>© 2024 IoB MoneyApp. All rights reserved</p>
        </footer>
      </main>
    </Router>
  );
}

export default App;
