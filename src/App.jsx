
import "./App.css";
import Login from "./pages/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Customer from "./pages/customer/Customer";
import Engineer from "./pages/engineer/Engineer";
import Error from "./pages/error/Error";
import CreateTicket from "./components/model/CreateTicket";
import { useEffect } from "react";

function App() {

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/ENGINEER" element={<Engineer />} />
        <Route path="/error" element={<Error />} />
        <Route path="/model" element={<CreateTicket />} />
     
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
