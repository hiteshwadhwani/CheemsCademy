import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/welcome/welcome";
import Header from "./components/Header";
import Login from "./components/Login";
import { Box } from "@chakra-ui/react";
import Foot from "./components/foot"
import Protected from "./components/protected";
import Home from "./components/home";
import Error from "./components/alert/error";

function App() {
  return (
    <div className="App">
      <Box bgColor="rgb(255,240,229)">
        <BrowserRouter>
          <Header />
          <Error />
          <Routes>
            <Route exact path="/" element={<Welcome />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/home" element={<Protected><Home /></Protected>} />
          </Routes>
        </BrowserRouter>
        <Foot />
      </Box>
    </div>
  );
}

export default App;
