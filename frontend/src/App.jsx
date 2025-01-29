import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Home from "./components/Home.jsx"
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx"
import AllProjects from "./components/AllProjects.jsx"
import AddProject from "./components/AddProject.jsx"
import ViewProject from "./components/ViewProject.jsx"
import Auth from "./components/Auth.jsx"
import EditProject from "./components/EditProject.jsx"
import Profile from "./components/Profile.jsx"
import NotAvailable from "./components/NotAvailable.jsx"
function App() {

  return (
    <>
      <Auth>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/all-projects' element={<AllProjects />} />
            <Route path='/add-project' element={<AddProject />} />
            <Route path='/project/:projectId/' element={<ViewProject />} />
            <Route path='/project/:projectId/edit' element={<EditProject />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='*' element={<NotAvailable />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </Auth>
    </>
  )
}

export default App