import './App.css';
import Sidebar from './components/DashNav';
import ContactList from './components/ContactList';
import AboutUs from './components/AboutUs';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <div className="flex">
        {/* Sidebar stays on the left */}
        <Sidebar />
        
        {/* Main content */}
        <div className="ml-[240px] flex-1 p-6">
          <Routes>
            <Route path="/contact-list" element={<ContactList />} />
            <Route path="/" element={<AboutUs />} />
          </Routes>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;
