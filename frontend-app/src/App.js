import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login/login";
import Home from "./homepage/home";
import AssignmentView from "./AssignmentView/assignmentview";


function App() {

  console.log("Inside App.js");
  return (
    <Routes>
       <Route path="/login" element={<Login/>} />
      <Route path="/dashboard" element={
      <PrivateRoute>
      <Dashboard/>
      </PrivateRoute>} />
      <Route path="/" element ={<Home/>} />

      <Route path="/dashboard/assignments/:id" element ={
        <PrivateRoute>
      <AssignmentView/>
      </PrivateRoute>} />


    </Routes>
  );
}

export default App;
