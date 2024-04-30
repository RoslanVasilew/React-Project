import React, { useEffect, useState } from "react";
import "/src/tudentPage.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function StudentPage() {
  const nav = useNavigate();
  const tmpMail = JSON.parse(localStorage.getItem("email"));
  const [img, setSrc] = useState("");
  const api = "https://localhost:7132/";
  const [student, setStudent] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [searchData, setSearchData] = useState("");
  useEffect(() => {
    const SetStudentApi = api + "api/Student/GetByEmail/email/" + tmpMail;
    fetch(SetStudentApi)
      .then((res) => res.json())
      .then((data) => {
        setSrc(`data:image/jpeg;base64,${data.img}`);
        setStudent(data);
      })
      .catch(() => {
        console.log("err");
      });

    const ReadTeachersApi = api + "api/Teacher/Read";
    fetch(ReadTeachersApi)
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data);
        setSearchData(data);
      })
      .catch(() => {
        console.log("err");
      });
  }, []);
  const ArrayRenderer = (items) => {
    if (items == null) {
      return;
    }
    // Render a list of items passed via props
    return (
      <div>
        {items.map((item, index) => (
          // Map each item to a div, using the index as a key
          <div className="card-container" key={item.id}>
            <img
              src={`data:image/jpeg;base64,${item.img}`}
              alt="user"
              style={{ height: "80px", width: "80px", borderRadius: "40%", objectFit:"cover" }}
            />
            <h3>{item.name}</h3>
            <p>
              Phone - {item.phone}
              <br />
              Email - {item.email}
              <br />
            </p>

            <div className="skills">
              <h6>Skills</h6>
              {item.fields}
              <div className="buttons" style={{ textAlign: "center" }}>
                <button
                  className="primary"
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",

                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, Send a Whatsup!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                       const GetTeacherApi  = api+'api/Teacher/InsertClass/studentemail/'+student.email+'/teacheremail/'+item.email;
                        fetch(GetTeacherApi, {
                          method: "POST",
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
                              console.log(data);
                          })
                          .catch((error) => {
                    
                            console.log("Error: Teacher not Exists");
                          });

                        const encodedMessage = encodeURIComponent(
                          `Hey ${item.name}, this is ${student.name} from RV-Lessons.\nI wanted to check about private lessons. Please get back to me`
                        );
                        const tmpPhone =
                          String("972") + String(item.phone.substring(1));
                        const whatsappUrl = `https://wa.me/${tmpPhone}?text=${encodedMessage}`;
                        window.open(whatsappUrl, "_blank");
                      }
                    });
                  }}
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <div className="serachBox">
        <input
          type=""
          className="search-Input"
          placeholder="Enter Study Field"
          onChange={(e) => {
            const filterTeacher = searchData.filter((item) =>
              item.fields
                .toString()
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
            );
            setTeachers(filterTeacher);
          }}
        ></input>
      </div>
      <div
        className="container1"
        style={{
          width: "100%",
          color: "white",
        }}
      >
        <h1>Teachers List</h1>

        <div className="teachersCards" style={{ width: "100%" }}>
          {ArrayRenderer(teachers)}
        </div>
      </div>
    </div>
  );
}
