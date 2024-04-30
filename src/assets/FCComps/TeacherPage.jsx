import React, { useEffect, useState } from "react";
import "/src/signup.css";
import CheckIcon from "@mui/icons-material/Check";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import Swal from "sweetalert2";
import { useActionData, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";

export default function TeacherPage() {
  const [value, setValue] = React.useState(0);
  const nav = useNavigate();
  const [teacher, setTeacher] = useState([]);
  const [studentZero, setStudentsZero] = useState([]);
  const [studentOne, setStudentsOne] = useState([]);
  const [imgSrc, setSrc] = useState("");
  const tmpMail = JSON.parse(localStorage.getItem("email"));
  const api = "https://localhost:7132/";

  useEffect(() => {
    const SetTeacherApi = api + "api/Teacher/checkif/email/" + tmpMail;

    fetch(SetTeacherApi)
      .then((res) => res.json())
      .then((data) => {
        setSrc(`data:image/jpeg;base64,${data.img}`);
        setTeacher(data);
      })
      .catch(() => {
        console.log("err");
      });

    const GetClassStudent =
      api + "api/Teacher/GetClassStudent/teacheremail/" + tmpMail;
    fetch(GetClassStudent)
      .then((res) => res.json())
      .then((data) => {
        setStudentsZero(data);
      })
      .catch(() => {
        console.log("err");
      });
    const GetCLassONes =
      api + "api/Teacher/GetClassStudentOne/teacheremail/" + tmpMail;
    fetch(GetCLassONes)
      .then((res) => res.json())
      .then((data) => {
        setStudentsOne(data);
      })
      .catch(() => {
        console.log("err");
      });
  }, []);
  const RemoveClass = (e) => {
      const studentEmail = (e.target.className);
      
      const DeleteClassApi  = api+'api/Teacher/DeleteClass/studentemail/'+studentEmail+'/teacheremail/'+tmpMail;
      fetch(DeleteClassApi, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
       
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
            console.log(studentEmail+" DELETED");
            setStudentsOne(
              studentOne.filter(
                (s) => s.email != studentEmail
              )
            );
        })
        .catch((error) => {
  
          console.log("Error: Class Not Delete");
        });

  }

  const RemoveClassZero = (e) => {
    const studentEmail = (e.target.className);
    
    const DeleteClassApi  = api+'api/Teacher/DeleteClass/studentemail/'+studentEmail+'/teacheremail/'+tmpMail;
    fetch(DeleteClassApi, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
     
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
          console.log(studentEmail+" DELETED");
          setStudentsZero(
            studentZero.filter(
              (s) => s.email != studentEmail
            )
          );
      })
      .catch((error) => {

        console.log("Error: Class Not Delete");
      });

}
  return (
    <div>
      <div className="container" style={{ minHeight: "unset" }}>
        <div className="teacherDiv">
          <header>
            <div className="header_img flex_column_center">
              <img src={imgSrc} alt="Logo" />
            </div>
            <div className="header_text flex_column_center">
    <table className="teacher-info-table">
        <tbody>
            <tr>
                <td>{teacher.name}</td>
            </tr>
            <tr>
                <td>{teacher.phone}</td>
            </tr>
            <tr>
                <td>{teacher.email}</td>
            </tr>
            <tr>
            <td className="courses-label">Courses:</td>
            </tr>
            <tr>
                <td>{teacher.fields}</td>
            </tr>
        </tbody>
    </table>
</div>

          </header>
         

        
          <button
            onClick={() => {
              nav("/updateT");
            }}
          >
            Update Details
          </button>
        </div>
        <div
          style={{ width: "100%", height: "500px", display: "none" }}
          className="bigDiv"
        >
          <div
            className="studentList"
            id="requsets"
            style={{ display: "none" }}
          >
            <br />
            <br />
            <h1>Requests List</h1>
            <table className="table-style">
              <tbody>
                {studentZero.map((student, index) => (
                  <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>
                      <button
                        onClick={() => {
                          Swal.fire({
                            icon: "success",
                            title: "Student Added to Class",
                            showConfirmButton: false,
                            timer: 1500,
                          }).then(() => {
                            console.log(student.email + " " + tmpMail);
                            const updateClassApi =
                              api +
                              "api/Teacher/UpdateClass?studentemail=" +
                              student.email +
                              "&teacheremail=" +
                              tmpMail;

                            fetch(updateClassApi, {
                              method: "PUT",
                              headers: {
                                "Content-Type": "application/json",
                              },
                            })
                              .then((response) => {
                                if (!response.ok) {
                                  throw new Error(
                                    "Network response was not ok"
                                  );
                                }
                                return response.json();
                              })
                              .then((data) => {
                                console.log("Class inserted");

                                setStudentsZero(
                                  studentZero.filter(
                                    (s) => s.email != student.email
                                  )
                                );
                                // const strr= [...studentOne, studentZero.filter(s => s.email ==student.email)];
                                if (studentOne.length == 0) {
                                  setStudentsOne(
                                    studentZero.filter(
                                      (s) => s.email == student.email
                                    )
                                  );
                                } else {
                                  setStudentsOne([
                                    ...studentOne,
                                    ...studentZero.filter(
                                      (s) => s.email == student.email
                                    ),
                                  ]);
                                }
                              })
                              .catch((error) => {
                                console.error("Error:", error);
                              });
                          });
                        }}
                      >
                        <CheckIcon></CheckIcon>
                      </button>
                    </td>
                    <td>
                      <button onClick={RemoveClassZero} className={student.email}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="studentList" id="history" style={{ display: "none" }}>
            <br />
            <br />
            <h1>History List</h1>
            <table className="table-style">
              <tbody>
                {studentOne.map((student, index) => (
                  <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>
                      <button onClick={RemoveClass} className={student.email}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        <Box>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Profile"
              icon={<HomeIcon />}
              onClick={() => {
                document.getElementById("history").style.display = "none";
                document.querySelector(".teacherDiv").style.display = "block";
                document.querySelector(".bigDiv").style.display = "none";
              }}
            />
            <BottomNavigationAction
              label="Requsets"
              icon={<AutoAwesomeMosaicIcon />}
              onClick={() => {
                document.getElementById("requsets").style.display = "block";
                document.getElementById("history").style.display = "none";
                document.querySelector(".teacherDiv").style.display = "none";
                document.querySelector(".bigDiv").style.display = "block";
              }}
            />
            <BottomNavigationAction
              label="History"
              icon={<AutoAwesomeMosaicIcon />}
              onClick={() => {
                document.getElementById("requsets").style.display = "none";
                document.getElementById("history").style.display = "block";
                document.querySelector(".teacherDiv").style.display = "none";
                document.querySelector(".bigDiv").style.display = "block";
              }}
            />
          </BottomNavigation>
        </Box>
      </div>
    </div>
  );
}
