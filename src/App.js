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
import Dashboard from "./components/dashboard/Dashboard";
import Catalog from "./components/catalog/Catalog"

function App() {
  return (
    <div className="App">
      {/* <Box > */}
        <BrowserRouter>
          <Header />
          <Error />
          <Box paddingTop='50px' bgColor="rgb(255,240,229)">
          <Routes>
            
            <Route exact path="/" element={<Welcome />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/catalog" element={<Catalog />} />
            <Route exact path="/home" element={<Protected><Home /></Protected>} />
            <Route exact path="/dashboard" element={<Protected><Dashboard /></Protected>} />
           
          </Routes>
          <Foot />
          </Box>
        </BrowserRouter>
        
      {/* </Box> */}
    </div>
  );
}

export default App;
