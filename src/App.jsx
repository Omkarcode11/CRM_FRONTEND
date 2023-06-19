import { useState } from "react";
import "./App.css";
import Login from "./pages/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Customer from "./pages/customer/Customer";
import Engineer from "./pages/engineer/Engineer";
import Error from "./pages/error/Error";
import EnhancedTable from "./components/table/DataTable";
import DataTable from "./components/table/DataTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/engineer" element={<Engineer />} />
        <Route path="/error" element={<Error/>} />
        <Route path="/tables" element={<DataTable/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
