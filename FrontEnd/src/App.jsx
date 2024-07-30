import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom'; // Import Route and Switch
import Navbar from './components/Navbar';
import Home from './components/Home';// import About from './pages/About';
// import Contact from './pages/Contact';
import Signup from './components/Signup'; // Import Signup page
import Login from './components/Login';
import Admin from './components/Admin';
import UpdateProduct from './components/UpdateProduct';
import AddProducts from './components/AddProducts';


const App = () => {
    return (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/updateproduct" element={<UpdateProduct />} />
            <Route path="/addproduct" element={<AddProducts />} />
          </Routes>
        </div>
      );
};

export default App;
