import React, { useEffect, useState } from "react";
import "/src/assets/CSS/HomePage.css";
import Swal from "sweetalert2";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const api = "https://proj.ruppin.ac.il/cgroup18/test2/tar1/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("Teacher");
  const [fact,setFact] = useState("");
  const nav = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  useEffect(() => {
    const getFactApi =
      "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random";
    fetch("http://numbersapi.com/random/math")
      .then((response) => response.text())
      .then((data) => {
        setFact(data);
      })
      .catch((error) => {
        console.error("Error fetching the math fact:", error);
       
      });
  }, []);
  const checkData = () => {
    if (email == "admin@admin.admin" && password == "admin123") {
      localStorage.setItem("email", JSON.stringify(email));
      nav("/adminPanel");
    } else {
    if (!validateEmail(email)) {
      setMessage("Wrong Email Format!");
      return;
    } else {
      setMessage("");
    }
    if (password.length < 8) {
      setMessage("Password at Least 8 Length!");
      return;
    } else {
      setMessage("");
    }
    if (type == "Teacher") {
      const GetTeacherApi =
        api + "api/Teacher/LogInTeacher/email/" + email + "/password";
      fetch(GetTeacherApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(password),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("email", JSON.stringify(email));
         
          nav("/teacherPage");
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "Teacher does not exists!",
            icon: "error",
            confirmButtonText: "Close",
          });
          console.log("Error: Teacher not Exists");
        });
    } else {
      const GetStudentApi =
        api + "api/Student/LogInStudent/email/" + email + "/password";
      fetch(GetStudentApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(password),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("email", JSON.stringify(email));
          localStorage.setItem("flag", JSON.stringify("student"));
          localStorage.setItem("student", JSON.stringify(data));
          nav("/studentpage");
        })
        .catch((error) => {
          console.log("Error: Student not Exists");
          Swal.fire({
            title: "Error!",
            text: "Student does not exists!",
            icon: "error",
            confirmButtonText: "Close",
          });
        });
    }}
  };
  return (
    <div>
      
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <div className="signin">
            <h1 style={{ color: "black" }}>Sign in</h1>
            <h2 style={{ color: "red" }}>{message}</h2>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <FormControl
              style={{ color: "black" }}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <FormLabel id="demo-radio-buttons-group-label">Select:</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Teacher"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Teacher"
                  control={<Radio />}
                  label="Teacher"
                />
                <FormControlLabel
                  value="Student"
                  control={<Radio />}
                  label="Student"
                />
              </RadioGroup>
            </FormControl>
            <button onClick={checkData}>Sign In</button>
          </div>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
            <h1>Welcome to Master Classmate!</h1><br />
            <h2>Your Gateway to Personalized Learning</h2>
              <br />
              <button
                className="ghost"
                id="signUp"
                onClick={() => {
                  nav("/teacherSignUp");
                }}
              >
                Sign Up As A Teahcer
              </button>
              <br />
              <button
                className="ghost"
                id="signUp"
                onClick={() => {
                  nav("/studentSignUp");
                }}
              >
                Sign Up As A Student
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <footer>
      <h2 >{fact}</h2>
      </footer>
    </div>
  );
}



