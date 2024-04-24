import enableNotifications from "@/utils/hooks/useFCMToken";
import React, { useEffect, useState } from "react";
import { FiCamera, FiUpload } from "react-icons/fi";
const Camera = () => {
  const [data, setData] = useState([]);
  const [source, setSource] = useState("");
  const [file, setFile] = useState("");
  const [uploadFromGallery, setUploadFromGallery] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDOB] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notificationPermission, setNotificationPermission] = useState();
  const [mode, setMode] = useState("online");

  const handleEnableNotification = () => {
    enableNotifications();
  };

  const handleCapture = (target) => {
    if (target.files && target.files.length !== 0) {
      const file = target.files[0];
      const newUrl = URL.createObjectURL(file);
      setSource(newUrl);
      setFile(file);
      setUploadFromGallery(false); // Reset to camera mode after uploading from gallery
    }
  };

  const handleUploadFromGallery = () => {
    setUploadFromGallery(true);
  };
  useEffect(() => {
    fetchProfileData();
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      setNotificationPermission("granted");
    }
  };

  const getAllData = () => {
    const idb =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB ||
      window.shimIndexedDB;
    const dbPromise = idb.open("profile-db", 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      console.log("db", db);
      try {
        const transaction = db?.transaction("profileData", "readonly");
        if (transaction) {
          const profileData = transaction?.objectStore("profileData");
          const users = profileData?.getAll();
          users.onsuccess = (query) => {
            const data = query.srcElement.result;
            console.log("indexedDB Data-->", data, data[0].data);

            setData(data[0].data[0]);
            setName(data[0].data[0].name);
            setDOB(data[0].data[0].dob);
            setPhoneNumber(data[0].data[0].phone);
            setFile(data[0].data[0].file);
          };
          users.onerror = (event) => {
            console.log("error", event);
          };
          transaction.oncomplete = () => {
            db.close();
          };
        }
      } catch (err) {
        console.log("err", err);
      }
    };
  };

  const setAllData = (data) => {
    const idb =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB ||
      window.shimIndexedDB;
    if (!idb) {
      alert("This browser doesn't support IndexedDB");
      return;
    }

    const request = idb.open("profile-db", 1);

    request.onerror = (event) => {
      console.error("Error occurred with IndexedDB:", event.target.error);
    };
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("profileData")) {
        console.log("Creating object store...");
        db.createObjectStore("profileData", {
          keyPath: "timestamp",
        });
      }
    };

    request.onsuccess = () => {
      const db = request?.result;

      if (!db.objectStoreNames.contains("profileData")) {
        console.error("Object store 'profileData' not found.");
        return;
      }

      const transaction = db?.transaction(["profileData"], "readwrite");

      transaction.onerror = (event) => {
        console.error("Transaction error:", event.target.error);
      };

      const profileData = transaction?.objectStore("profileData");

      const getDataRequest = profileData.getAll();

      getDataRequest.onsuccess = (event) => {
        const storedDataArray = event.target.result || [];

        if (storedDataArray.length > 0) {
          const latestStoredData = storedDataArray[storedDataArray.length - 1];
          const storedTimestamp = latestStoredData.timestamp;
          const currentTimestamp = data.timestamp;

          if (currentTimestamp - storedTimestamp > 600000) {
            const clearRequest = profileData.clear();
            clearRequest.onsuccess = () => {
              const putRequest = profileData.put(data);
              putRequest.onerror = (event) => {
                console.error(
                  "Error putting data into IndexedDB:",
                  event.target.error
                );
              };
            };
            clearRequest.onerror = (event) => {
              console.error(
                "Error clearing data from IndexedDB:",
                event.target.error
              );
            };
          }
        } else {
          // If no data is stored, simply add it
          const addRequest = profileData.add(data);
          addRequest.onerror = (event) => {
            console.error(
              "Error adding data into IndexedDB:",
              event.target.error
            );
          };
        }

        transaction.oncomplete = () => {
          db.close();
        };
      };

      getDataRequest.onerror = (event) => {
        console.error(
          "Error retrieving stored data from IndexedDB:",
          event.target.error
        );
      };
    };
  };

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
        setFile(profiledata.file);
        if (
          navigator.onLine
          // && navigator?.connection?.effectiveType === "4g"
        ) {
          setData(data?.data);
          setAllData(data);
        } else {
          setMode("offline");
          getAllData();
        }
      })
      .catch((err) => {
        if (
          !navigator.onLine
          // || navigator?.connection?.effectiveType !== "4g"
        ) {
          setMode("offline");
          getAllData();
        }
        console.log("Err", err);
      });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("phone", phoneNumber);
    formData.append("file", file);
    console.log("formData", formData);
    fetch(process.env.NEXT_PUBLIC_BASE_URL + "profile", {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        fetchProfileData();
        alert("saved successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {mode === "offline" && (
        <div className="flex items-center justify-center border bg-red-500 text-white text-bold">
          You are in offline mode, please check your internet!
        </div>
      )}
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
                  {file ? (
                    <img
                      src={source ? source : `/images/${file}`}
                      alt={"profile"}
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
                  disabled={!name || !phoneNumber || !dob || !file}
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleEnableNotification}
                  // onClick={askForPermissionToReceiveNotifications}
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
