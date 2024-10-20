import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './app/layout/Layout';
import Home from './app/layout/home/Home';
import PortfolioPage from './app/layout/portfolio-page/PortfolioPage';
import About from './app/layout/about/About';
import ContactUs from './app/layout/contact-us/ContactUs';
import Login from './app/layout/login/Login';
import CreateUser from './app/layout/create-user/CreateUser';
import CreatePortfolio from './app/layout/portfolio-page/create-portfolio/CreatePortfolio';
import Portfolio from './app/layout/portfolio-page/portfolio/Portfolio';

function App() {
 return (
  <Router>
   <Routes>
    <Route path="/" element={<Navigate to="/home" />} />
    <Route path="/" element={<Layout />}>
     <Route path="home" element={<Home />} />
     <Route path="portfolio" element={<PortfolioPage />} />
     <Route path="portfolio/:id" element={<Portfolio />} />
     <Route path="create-portfolio" element={<CreatePortfolio />} />
     <Route path="about" element={<About />} />
     <Route path="contactus" element={<ContactUs />} />
     <Route path="login" element={<Login />} />
     <Route path="create-user" element={<CreateUser />} />
    </Route>
   </Routes>
  </Router>
 );
}

export default App;
