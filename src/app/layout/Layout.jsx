import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";

function Layout() {
 return (
  <div>
   <Header />
   <div className="main-content">
    <Outlet /> {/* This will render the matched route's component */}
   </div>
   <Footer />
  </div>
 );
}

export default Layout;
