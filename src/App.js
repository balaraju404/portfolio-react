import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './app/layout/Layout';
import Home from './app/layout/home/Home';
import About from './app/layout/about/About';
import Login from './app/layout/login/Login';

function App() {
 return (
  <Router>
   <Routes>
    <Route path="/" element={<Navigate to="/home" />} />
    <Route path="/" element={<Layout />}>
     <Route path="home" element={<Home />} />
     <Route path="portfolio" element={<About />} />
     <Route path="about" element={<About />} />
     <Route path="contactus" element={<About />} />
     <Route path="login" element={<Login />} />
    </Route>
   </Routes>
  </Router>
 );
}

export default App;
