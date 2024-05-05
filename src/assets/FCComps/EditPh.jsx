import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditPh() {
  const [img, setSelectedImage] = useState(null);
  const api = "https://proj.ruppin.ac.il/cgroup18/test2/tar1/";
  const tmpMail = JSON.parse(localStorage.getItem("email"));
  const [stream, setStream] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const nav = useNavigate();
  const startCamera = async () => {
    document.querySelector(".videoSet").style.display = 'block'; 
    document.querySelector(".canvasSet")?  document.querySelector(".canvasSet").style.display = 'none': "";
   
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing the camera: ", error);
    }
  };
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      const sr = imageUrl.split(",")[1];
      setSelectedImage(sr);
    }
  };
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    document.querySelector(".canvasSet")? document.querySelector(".canvasSet").style.display = 'block':"";
    if (video && canvas) {
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      setImageUrl(canvas.toDataURL("image/png"));
      document.querySelector(".videoSet").style.display = 'none'; 
      const sr = canvas.toDataURL("image/png").split(",")[1];
      setSelectedImage(sr);
    }
  };
  const send = () => {
    fetch(api + "api/Student/UpdateImg1/email/" + tmpMail, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(img),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {

        // Retrieve the student object from localStorage
        const student = JSON.parse(localStorage.getItem("student") || '{}');

        // Update the img property with the new image
        student.img = img;

        // Save the updated student object back to localStorage
        localStorage.setItem("student", JSON.stringify(student));
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
        // Navigate to the student page
        nav('/studentpage');
      })
      .catch((error) => {
        console.error("Error:", error);
      });
};

  return (
    <div style={{display:"grid", justifyContent:"center"}}>
      <div className="mb-1">
        Set Image: <span className="font-css top">*</span>
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
                setSelectedImage(base64String.split(",")[1]);  // Save base64 encoded image data
                
                document.querySelector(".videoSet").style.display = 'none'; 
                setImageUrl(base64String);  // Also update imageUrl to display the uploaded image
              };
            
              reader.onerror = function (error) {
                console.error("Error: ", error);
              };
            
              reader.readAsDataURL(file);  // Start the file reading process
            }}
            
          />
        </div>
      </div>
      <div>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: "300px" }}
          className="videoSet"
        ></video>
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
          width="300"
          height="200"
          
        ></canvas>
        {imageUrl && (
          <img src={imageUrl} alt="Snapshot" style={{ width: "300px" }} className="canvasSet" />
        )}
      </div>
      <div>
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={takePhoto}>Take Photo</button>
        {/* <button onClick={stopCamera}>Stop Camera</button> */}
      </div>
      <br />
      <button onClick={send}>Send</button>
      <button onClick={() => nav('/studentpage')}>Cancel</button>

    </div>
  );
}
