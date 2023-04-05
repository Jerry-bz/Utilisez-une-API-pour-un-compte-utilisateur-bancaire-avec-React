import React from "react";
import User from "./pages/user";
import SignIn from "./pages/sign-in";
import Home from "./pages/home";
import Error from "./pages/error";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";

// Application Router

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<User />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
