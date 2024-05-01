import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '/src/assets/CSS/App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './assets/FCComps/HomePage'
import TeacherPage from './assets/FCComps/TeacherPage'
import StudentPage from './assets/FCComps/StudentPage'
import TeacherSignUp from './assets/FCComps/TeacherSignUp'
import StudentSignUp from './assets/FCComps/StudentSignUp'
import UpdateT from './assets/FCComps/UpdateT'
import EditPh from './assets/FCComps/EditPh'
//import { Navbar } from 'react-bootstrap'
import Navbar from './assets/FCComps/Navbar';

function App() {

  return (
   <div>
    <Navbar />
     <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/teacherPage' element={<TeacherPage/>}></Route>
      <Route path='/studentpage' element={<StudentPage/>}></Route>
      <Route path='/teacherSignUp' element={<TeacherSignUp/>}></Route>
      <Route path='/studentSignUp' element={<StudentSignUp/>}></Route>
      <Route path='/updateT' element={<UpdateT/>}></Route>
      <Route path='/editP' element={<EditPh/>}></Route>

    </Routes>
   </div>
  )
}

export default App
