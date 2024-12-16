import React from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import SignupPage from "../pages/SignupPage";  
import LoginPage from '../pages/LoginPage';
import EditProjectPage from '../pages/EditProjectPage';
import ProjectDetailsPage from '../pages/ProjectDetailsPage';
import ProjectList from '../pages/ProjectsList';
import AddProject from '../Components/AddProject';
import HomePage from '../pages/HomePage';
import PageNotFound from '../pages/PageNotFound';
import IsAnon from "../Components/IsAnon"
import IsPrivate from "../Components/IsPrivate"
 
import {AnimatePresence} from 'framer-motion'

function AnimatedRoutes () {

    const location = useLocation();
    
  return (
    <AnimatePresence>
    <Routes location={location} key={location.pathname}>     
        <Route path='/' element={<HomePage/>} />
        <Route path="/projects" element={ <IsPrivate> <ProjectList /></IsPrivate> } />
        <Route path="/projects/:projectId" element={<IsPrivate><ProjectDetailsPage /></IsPrivate> } />
        <Route path="/create" element={<IsPrivate><AddProject /></IsPrivate> } />
        <Route path="/projects/edit/:projectId" element={<IsPrivate> <EditProjectPage /> </IsPrivate>} />
        <Route path="/signup" element={<IsAnon><SignupPage /> </IsAnon>} />
        <Route path="/login" element={ <IsAnon><LoginPage /> </IsAnon> } />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </AnimatePresence>
  )
}

export default AnimatedRoutes