import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentSignUp() {
  const nav = useNavigate();
  const [img, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const api = "https://proj.ruppin.ac.il/cgroup18/test2/tar1/";

  const SignUpFunction = () => {
    let regex = /^[a-zA-Z]+$/;
    if (!regex.test(name)) {
      setErr("Wrong Name Input!");
      return;
    } else {
      setErr("");
    }
    if (phone == 0) {
      setErr("Wrong Phone Number!");
      return;
    } else {
      setErr("");
    }
    regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      setErr("Wrong Email Input!");
      return;
    } else {
      setErr("");
    }
    if (password.length < 8) {
      setErr("Wrong Pass Input!");
      return;
    } else {
      setErr("");
    }


    if (img == null) {
      setErr("Wrong Img Input!");
      return;
    } else {
      setErr("");
    }

    const student = {
      id: 1,
      phone,
      name,
      email,
      password,

      img,
    };
    console.log(student);
    const SetTeacherApi = api + "api/Student/checkif/email/" + email;
    fetch(SetTeacherApi)
      .then((res) => res.json())
      .then((data) => {
        console.log("student Already Exists");
      })
      .catch(() => {
        insertStudent(student);
      });
  };

  const insertStudent = (student) => {
    fetch(api + "api/Student/Insert1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("student inserted");
        localStorage.setItem("email", JSON.stringify(email));
        nav("/studentpage");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="wrapper">
      <h2>Student Registration</h2>
      <h2 style={{ color: "red" }}>{err}</h2>
      <form action="#">
        <div className="input-box">
          <input
            type="number"
            placeholder="Enter your Phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          ></input>
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Create password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
      

        <div className="mb-1">
          Image <span className="font-css top">*</span>
          <div className="">
            <input
              type="file"
              id="file-input"
              name="ImageStyle"
              onChange={(event) => {
                let file = event.target.files[0];
                const reader = new FileReader();

                reader.onload = function (event) {
                  const base64String = event.target.result;
                  console.log(base64String);
                  // Display the Base64 string in a textarea
                  setSelectedImage(base64String.split(",")[1]);
                };

                reader.onerror = function (error) {
                  console.error("Error: ", error);
                };

                // This will start the file reading process
                reader.readAsDataURL(file);
              }}
            />
          </div>
        </div>
        <div className="input-box button">
          <input
            type="button"
            value="Register Now"
            onClick={SignUpFunction}
          ></input>
        </div>
        <div className="text">
          <h3>
            Already have an account?{" "}
            <a
              onClick={() => {
                nav("/");
              }}
            >
              Login now
            </a>
          </h3>
        </div>
      </form>
    </div>
  );
}
