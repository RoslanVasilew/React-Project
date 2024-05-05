import React, { useEffect, useState } from "react";
import "/src/assets/CSS/Navbar.css"; // Ensure the CSS path is correct
import { useNavigate } from "react-router-dom";
import { Box, Modal } from '@mui/material';
import { BorderAllRounded } from "@mui/icons-material";

const Navbar = () => {
  const email = localStorage.getItem("email"); // Get 'email' from local storage
  const dom = JSON.parse(localStorage.getItem("flag"));
  const nav = useNavigate();
  const api = "https://localhost:7132/";
  const [teachers, setTeachers] = useState([]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height:"90%",
    color: "black",
    bgcolor: "background.paper",
    border: "2px solid #000",
    BorderAllRounded:"50%",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const [student, setStudent] = useState([]);
  const [img, setSrc] = useState([]);
  const handleOpen = () => {
    setOpen(true);
    setStudent(JSON.parse(localStorage.getItem("student")));
    setSrc(`data:image/jpeg;base64,${JSON.parse(localStorage.getItem("student")).img}`);

    const SetStudentApi = api + "api/Teacher/GetStudentClasses/studentemail/" + JSON.parse(localStorage.getItem("student")).email;
    fetch(SetStudentApi)
      .then((res) => res.json())
      .then((data) => {
       setTeachers(data);
      })
      .catch(() => {
        console.log("err ");
      });

  };
  const handleClose = () => setOpen(false);
  const handleDisconnect = (e) => {
    localStorage.clear(); // Clear local storage
    nav("/");
  };
  const editImg = () => {
    nav("/editP");
  };
  const profileShow = () => {
    const std = JSON.parse(localStorage.getItem("student"));
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/"><img src="/src/images/logo.png" alt="Logo" /></a>
      </div>
      <ul className="navbar-menu">
        {dom ? (
          <li style={{ cursor: "pointer" }}>
            <a onClick={handleOpen}>Open modal</a>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
              <div className="card">
                <div className="card_profile_img">
                  <img src={img} className="prfImg" alt=""></img>
                </div>
                <div className="card_content">
                  <h3>{student.name}</h3>
                  <span>Student</span>
                  <p>
                    Email - {student.email}<br/>
                    Phone - {student.phone}
                  </p>
                  <h2>Teachers:</h2>
                  <ul>
                    {teachers.map((t)=>{
                        return <li>Name - {t.name} <br/> courses - {t.fields}</li>;
                    })}
                  </ul>
                </div>
                 
              </div>
              </Box>
            </Modal>
          </li>
        ) : (
          ""
        )}
        {dom ? (
          <li style={{ color: "black", cursor: "pointer" }} onClick={editImg}>
            Edit Img
          </li>
        ) : (
          ""
        )}
        {email ? (
          <li
            style={{ color: "black", cursor: "pointer" }}
            onClick={handleDisconnect}
          >
            Disconnect
          </li>
        ) : (
          " "
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
