
import './App.css'
import { Route, Routes } from "react-router-dom";

import IsAnon from "./Components/IsAnon"
import IsPrivate from "./Components/IsPrivate"

import Navbar from './Components/NavBar';

import SignupPage from "./pages/SignupPage";  
import LoginPage from './pages/LoginPage';

import EditProjectPage from './pages/EditProjectPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import ProjectList from './pages/ProjectsList';

 
function App() {
  return (
    <div className="App">
      <Navbar />
 
      <Routes>     
        <Route path="/projects" element={ <IsPrivate> <ProjectList /></IsPrivate> } />
        <Route path="/projects/:projectId" element={<IsPrivate><ProjectDetailsPage /></IsPrivate> } />
        <Route path="/projects/edit/:projectId" element={<IsPrivate> <EditProjectPage /> </IsPrivate>} />
        <Route path="/signup" element={<IsAnon><SignupPage /> </IsAnon>} />
        <Route path="/login" element={ <IsAnon><LoginPage /> </IsAnon> } />
      </Routes>
    </div>
  );
}
 
export default App;