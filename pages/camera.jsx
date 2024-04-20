import React, { useEffect, useState } from "react";
import { FiCamera, FiUpload } from "react-icons/fi";

const Camera = () => {
  const [source, setSource] = useState("");
  const [uploadFromGallery, setUploadFromGallery] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDOB] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notificationPermission, setNotificationPermission] = useState();
  useEffect(() => {
    // Update notification permission state
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const handleEnableNotification = () => {
    if ("Notification" in window) {
      // Request permission for notifications
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.warn("Notification permission denied.");
        }
      });
    }
  };

  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
        setUploadFromGallery(false); // Reset to camera mode after uploading from gallery
      }
    }
  };

  const handleUploadFromGallery = () => {
    setUploadFromGallery(true);
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = () => {
    fetch(process.env.NEXT_PUBLIC_BASE_URL + "profile", {
      method: "GET",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data.data[0]);
        const profiledata = data.data[0];
        setName(profiledata.name);
        setDOB(profiledata.dob);
        setPhoneNumber(profiledata.phone);
        setSource(profiledata.profile_pic);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  const handleSubmit = () => {
    const payload = {
      name: name,
      dob: dob,
      phone: phoneNumber,
      profile_pic: source,
    };
    fetch(process.env.NEXT_PUBLIC_BASE_URL + "profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      // headers: new Headers({
      //   "ngrok-skip-browser-warning": "69420",
      // }),
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data saved suceessfully!");
        // setName("");
        // setSource("");
        // setDOB("");
        // setPhoneNumber("");
        fetchProfileData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-between px-4 pt-4">
        <h2>Profile</h2>
        <h2>Welcome Back</h2>
      </div>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <div>
              {/* Display Image */}
              <div className="flex justify-center items-center mt-4">
                <div
                  className="w-32 h-32 rounded-full overflow-hidden border"
                  style={{
                    border: "2px solid #ccc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "1rem", // Added margin bottom for spacing
                  }}
                >
                  {source ? (
                    <img
                      src={source}
                      alt={"snap"}
                      className="max-w-full max-h-full"
                    />
                  ) : (
                    <div className="flex justify-center items-center w-full h-full">
                      <FiCamera size={60} />
                    </div>
                  )}
                </div>
              </div>
              {/* Camera Capture */}
              <div className="text-center">
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  capture="environment"
                  onChange={(e) => handleCapture(e.target)}
                  className="hidden" // Use a CSS class to hide the input element
                />
                <label
                  htmlFor="icon-button-file"
                  className="flex items-center justify-center cursor-pointer" // Add cursor-pointer for better usability
                >
                  <FiCamera size={20} />
                  <span className="ml-2">Capture</span>
                </label>
              </div>
              {/* Upload from Gallery */}
              <div className="text-center">
                <input
                  accept="image/*"
                  id="icon-button-gallery"
                  type="file"
                  onChange={(e) => handleCapture(e.target)}
                  className="hidden" // Use a CSS class to hide the input element
                />
                <label
                  htmlFor="icon-button-gallery"
                  className="flex items-center justify-center cursor-pointer" // Add cursor-pointer for better usability
                >
                  <FiUpload size={20} onClick={handleUploadFromGallery} />
                  <span className="ml-2">Upload</span>
                </label>
              </div>

              {/* Input fields */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={(e) => setDOB(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              {/* Submit Button */}
              <div className="mt-4">
                <button
                  disabled={!name || !phoneNumber || !dob || !source}
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleEnableNotification}
                  disabled={notificationPermission === "granted"}
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                    notificationPermission === "granted"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {notificationPermission === "granted"
                    ? "Notifications Enabled"
                    : "Enable Notification"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Camera;
