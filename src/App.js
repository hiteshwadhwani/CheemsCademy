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
import Course from "./components/course/Course";
import CreateCourse from "./components/admin/createCourse";
import Player from './components/dashboard/player'

function App() {
  return (
    <div className="App">
      {/* <Box > */}
        <BrowserRouter>
          <Header />
          
          <Box paddingTop='65px' bgColor="rgb(255,240,229)">
          <Error />
          <Player />
          <Routes>
            
            <Route exact path="/" element={<Welcome />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/catalog" element={<Catalog />} />
            <Route exact path='/course/:id' element={<Course />} />
            <Route exact path="/home" element={<Protected><Home /></Protected>} />
            <Route exact path="/dashboard" element={<Protected><Dashboard /></Protected>} />
            <Route exact path="/create-course" element={<CreateCourse />} />
           
          </Routes>
          <Foot />
          </Box>
        </BrowserRouter>
        
      {/* </Box> */}
    </div>
  );
}

export default App;
