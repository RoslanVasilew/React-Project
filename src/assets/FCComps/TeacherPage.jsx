import React, { useEffect, useState } from "react";
import "/src/assets/CSS/signup.css";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import Swal from "sweetalert2";

export default function TeacherPage() {
  const [value, setValue] = useState(0);
  const nav = useNavigate();
  const [teacher, setTeacher] = useState([]);
  const [studentZero, setStudentsZero] = useState([]);
  const [studentOne, setStudentsOne] = useState([]);
  const [imgSrc, setSrc] = useState("");
  const tmpMail = JSON.parse(localStorage.getItem("email"));
  const api = "https://localhost:7132/";

  useEffect(() => {
    const SetTeacherApi = api + "api/Teacher/checkif/email/" + tmpMail;
    const GetClassStudent = api + "api/Teacher/GetClassStudent/teacheremail/" + tmpMail;
    const GetClassOnes = api + "api/Teacher/GetClassStudentOne/teacheremail/" + tmpMail;

    fetch(SetTeacherApi)
      .then((res) => res.json())
      .then((data) => {
        setSrc(`data:image/jpeg;base64,${data.img}`);
        setTeacher(data);
      })
      .catch(() => console.log("Error loading teacher data"));

    fetch(GetClassStudent)
      .then((res) => res.json())
      .then((data) => setStudentsZero(data))
      .catch(() => console.log("Error loading class students"));

    fetch(GetClassOnes)
      .then((res) => res.json())
      .then((data) => setStudentsOne(data))
      .catch(() => console.log("Error loading class students one"));
  }, []);

  const RemoveClass = (e) => {
    const studentEmail = e.target.className;

    const DeleteClassApi =
      api +
      "api/Teacher/DeleteClass/studentemail/" +
      studentEmail +
      "/teacheremail/" +
      tmpMail;
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
        console.log(studentEmail + " DELETED");
        setStudentsOne(studentOne.filter((s) => s.email != studentEmail));
      })
      .catch((error) => {
        console.log("Error: Class Not Delete");
      });
  };


  const RemoveClassZero = (e) => {
    const studentEmail = e.target.className;
    const DeleteClassApi = api + "api/Teacher/DeleteClass/studentemail/" + studentEmail + "/teacheremail/" + tmpMail;

    fetch(DeleteClassApi, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(() => {
      setStudentsZero(studentZero.filter((s) => s.email !== studentEmail));
      console.log(studentEmail + " DELETED");
    })
    .catch(() => console.log("Error: Class not deleted"));
  };

  return (
    <div>
      <div className="tprofile">
        <div className="container" style={{ minHeight: "unset" }}>
          <div className="teacherDiv">
            <header>
              <div className="header_img flex_column_center">
                <img src={imgSrc} alt="Teacher" />
              </div>
              <div className="header_text flex_column_center">
                <table className="teacher-info-table">
                  <tbody>
                    <tr className="notifBar">
                      <td style={{ textAlign: 'center', width:'100%' }}>
                       {studentZero.length > 0 ? <>{studentZero.length}<br/> New Requests</> : ""}
                      </td>
                      <td style={{ textAlign: 'center', width:'100%', borderLeft:'1px solid' }}>
                        {studentOne.length > 0 ? <>{studentOne.length}<br/>Students</> : ""}
                      </td>

                    </tr>
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
            <button onClick={() => nav("/updateT")}>Update Details</button>
            <Box>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
              >
                <BottomNavigationAction label="Requests" icon={<AutoAwesomeMosaicIcon />} onClick={() => {
                    document.getElementById("requests").style.display = "block";
                    document.getElementById("history").style.display = "none";
                }} />
                <BottomNavigationAction label="Students" icon={<AutoAwesomeMosaicIcon />} onClick={() => {
                    document.getElementById("requests").style.display = "none";
                    document.getElementById("history").style.display = "block";
                }} />
              </BottomNavigation>
            </Box>
          </div>
        </div>
      </div>
      <div className="tableShow">
        <div className="studentList" id="requests">
          <br /><br />
          <h1>Requests List</h1>
          {studentZero.length > 0 ? (
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
                                throw new Error("Network response was not ok");
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
                    </button>                    </td>
                    <td>
                      <button onClick={RemoveClassZero} className={student.email}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No new requests.</p>
          )}
        </div>
        <div className="studentList" id="history" style={{ display: "none" }}>
          <br /><br />
          <h1>Active students list</h1>
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
  );
}
