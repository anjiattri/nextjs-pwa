// import React, { useEffect, useState } from "react";

// const Settings = () => {
//   const [data, setData] = useState([]);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mode, setMode] = useState("online");
//   const getAllData = () => {
//     const idb =
//       window.indexedDB ||
//       window.mozIndexedDB ||
//       window.webkitIndexedDB ||
//       window.msIndexedDB ||
//       window.shimIndexedDB;
//     const dbPromise = idb.open("user-db", 1);
//     dbPromise.onsuccess = () => {
//       const db = dbPromise.result;
//       const transaction = db.transaction("userData", "readonly");
//       const userData = transaction.objectStore("userData");
//       const users = userData.getAll();
//       users.onsuccess = (query) => {
//         console.log("indexedDB Data", query.srcElement.result);

//         setData(query.srcElement.result);
//       };
//       users.onerror = (event) => {
//         console.log("error", event);
//       };
//       transaction.oncomplete = () => {
//         db.close();
//       };
//     };
//   };

//   const setAllData = (data) => {
//     const idb =
//       window.indexedDB ||
//       window.mozIndexedDB ||
//       window.webkitIndexedDB ||
//       window.msIndexedDB ||
//       window.shimIndexedDB;
//     if (!idb) {
//       alert("This browser doesn't support IndexedDB");
//     }
//     const request = idb.open("user-db", 1);
//     request.onerror = (event) => {
//       console.log("Error occurred with IndexedDB", event);
//     };
//     request.onupgradeneeded = (event) => {
//       const db = request.result;
//       if (!db.objectStoreNames.contains("userData")) {
//         db.createObjectStore("userData", {
//           keyPath: "email",
//         });
//       }
//     };
//     request.onsuccess = () => {
//       const db = request.result;
//       const transaction = db.transaction("userData", "readwrite");
//       const userData = transaction.objectStore("userData");
//       const timestamp = Date.now();

//       data?.forEach((ele) => {
//         // Check if data is older than 10 minutes
//         const email = ele?.email;
//         const storedDataRequest = userData.get(email);
//         storedDataRequest.onsuccess = () => {
//           const storedData = storedDataRequest.result;
//           console.log("storedData", storedData);
//           console.log(
//             "time",
//             timestamp,
//             storedDataRequest.result,
//             storedData?.timestamp,
//             timestamp - storedData?.timestamp > 600000
//           );
//           // if (storedData?.timestamp !== undefined) {
//           if (!storedData || timestamp - storedData?.timestamp > 600000) {
//             console.log("inside if");
//             // If data doesn't exist or is older than 10 minutes, update it
//             ele.timestamp = timestamp;
//             const users = userData.put(ele);
//             users.onsuccess = () => {
//               transaction.oncomplete = () => {
//                 db.close();
//               };
//             };
//             users.onerror = (event) => {
//               console.log("err", event);
//             };
//           }
//           // }
//         };
//       });
//     };
//   };
//   // const getAllData = () => {
//   //   const idb =
//   //     window.indexedDB ||
//   //     window.mozIndexedDB ||
//   //     window.webkitIndexedDB ||
//   //     window.msIndexedDB ||
//   //     window.shimIndexedDB;
//   //   const dbPromise = idb.open("user-db", 1);
//   //   dbPromise.onsuccess = () => {
//   //     const db = dbPromise.result;
//   //     const transaction = db.transaction("userData", "readonly");
//   //     const userData = transaction.objectStore("userData");
//   //     const users = userData.getAll();
//   //     users.onsuccess = (query) => {
//   //       console.log("indexedDB Data", query.srcElement.result);
//   //       setData(query.srcElement.result);
//   //     };
//   //     users.onerror = (event) => {
//   //       console.log("error", event);
//   //     };
//   //     transaction.oncomplete = () => {
//   //       db.close();
//   //     };
//   //   };
//   // };

//   // const setAllData = (data) => {
//   //   const idb =
//   //     window.indexedDB ||
//   //     window.mozIndexedDB ||
//   //     window.webkitIndexedDB ||
//   //     window.msIndexedDB ||
//   //     window.shimIndexedDB;
//   //   if (!idb) {
//   //     alert("this browser doesnt support INDEXEDDB");
//   //   }
//   //   const request = idb.open("user-db", 1);
//   //   request.onerror = (event) => {
//   //     console.log("Error occured with indexedDB", event);
//   //   };
//   //   request.onupgradeneeded = (event) => {
//   //     const db = request.result;
//   //     if (!db.objectStoreNames.contains("userData")) {
//   //       db.createObjectStore("userData", {
//   //         keyPath: "email",
//   //       });
//   //     }
//   //   };
//   //   request.onsuccess = () => {
//   //     const db = request.result;
//   //     const transaction = db.transaction("userData", "readwrite");
//   //     const userData = transaction.objectStore("userData");
//   //     data?.map((ele) => {
//   //       const users = userData.put(ele);
//   //       users.onsuccess = () => {
//   //         transaction.oncomplete = () => {
//   //           db.close();
//   //         };
//   //       };
//   //       users.onerror = (event) => {
//   //         console.log("err", event);
//   //       };
//   //     });
//   //   };
//   // };
//   useEffect(() => {
//     fetch("http://localhost:4000/users")
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data?.data);
//         // window.localStorage.setItem("users", JSON.stringify(data?.data));
//         setAllData(data?.data);
//       })
//       .catch((err) => {
//         // alert("offlien");
//         setMode("offline");
//         // let data = window.localStorage.getItem("users");
//         getAllData();
//         // setData(JSON.parse(data));
//       });
//   }, []);
//   const uploadData = () => {
//     const payload = {
//       first_name: firstName,
//       last_name: lastName,
//       email: email,
//     };

//     fetch("http://localhost:4000/users", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data?.data);
//         setFirstName("");
//         setLastName("");
//         setEmail("");
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div>
//         {mode === "offline" && (
//           <div className="flex items-center justify-center border bg-red-500 text-white text-bold">
//             You are in offline mode, please check your internet!
//           </div>
//         )}
//       </div>
//       <div className="flex justify-between px-4 pt-4">
//         <h2>Setting</h2>
//         <h2>Welcome Back, Clint</h2>
//       </div>
//       <div className="p-4">
//         <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
//           <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault(); // Prevent default form submission
//                 uploadData(); // Call your uploadData function
//               }}
//               className="scroll-smooth md:scroll-auto"
//             >
//               <div className="mb-6">
//                 <label
//                   htmlFor="firstName"
//                   className="block mb-2 text-sm font-medium"
//                 >
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                   placeholder="Anjali"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-6">
//                 <label
//                   htmlFor="lastName"
//                   className="block mb-2 text-sm font-medium"
//                 >
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                   placeholder="Singh"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-6">
//                 <label
//                   htmlFor="email"
//                   className="block mb-2 text-sm font-medium"
//                 >
//                   Email address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                   placeholder="john.doe@company.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//       <div className="p-4">
//         <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
//           <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
//             <span>First Name</span>
//             <span className="sm:text-left text-right">Last Name</span>
//             <span className="hidden md:grid">Email</span>
//           </div>
//           <ul>
//             {data?.map((details, index) => (
//               <li
//                 key={index}
//                 className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
//               >
//                 <p className="text-gray-600 sm:text-left text-right">
//                   {details.first_name}
//                 </p>
//                 <p className="text-gray-600 sm:text-left text-right">
//                   {details.last_name}
//                 </p>
//                 <p className="hidden md:flex">{details.email}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Settings = () => {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState("online");
  const router = useRouter();

  const getAllData = () => {
    const idb =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB ||
      window.shimIndexedDB;
    const dbPromise = idb.open("user-db", 1);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      console.log("db", db);
      try {
        const transaction = db?.transaction("userData", "readonly");
        if (transaction) {
          const userData = transaction?.objectStore("userData");
          const users = userData?.getAll();
          users.onsuccess = (query) => {
            const data = query.srcElement.result;
            console.log("indexedDB Data-->", data, data[0].data);

            setData(data[0].data);
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

    const request = idb.open("user-db", 1);

    request.onerror = (event) => {
      console.error("Error occurred with IndexedDB:", event.target.error);
    };
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("userData")) {
        db.createObjectStore("userData", {
          keyPath: "timestamp",
        });
      }
    };

    request.onsuccess = () => {
      const db = request?.result;

      // if (db.objectStoreNames.contains("userData")) {
      // }
      const transaction = db?.transaction(["userData"], "readwrite");

      const userData = transaction?.objectStore("userData");

      const getDataRequest = userData.getAll();

      getDataRequest.onsuccess = (event) => {
        const storedDataArray = event.target.result || [];

        if (storedDataArray.length > 0) {
          const latestStoredData = storedDataArray[storedDataArray.length - 1];
          const storedTimestamp = latestStoredData.timestamp;
          const currentTimestamp = data.timestamp;

          if (currentTimestamp - storedTimestamp > 600000) {
            const clearRequest = userData.clear();
            clearRequest.onsuccess = () => {
              const putRequest = userData.put(data);
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
          const addRequest = userData.add(data);
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

  useEffect(() => {
    fetchSettingData();
  }, []);
  const uploadData = () => {
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    fetch(process.env.NEXT_PUBLIC_BASE_URL + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },

      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setFirstName("");
        setLastName("");
        setEmail("");
        fetchSettingData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchSettingData = () => {
    console.log("process.env.BASE_URL", process.env.NEXT_PUBLIC_BASE_URL);
    fetch(process.env.NEXT_PUBLIC_BASE_URL + "users", {
      method: "GET",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (navigator.onLine) {
          setData(data?.data);
          setAllData(data);
        } else {
          setMode("offline");
          getAllData();
        }
      })
      .catch((err) => {
        if (!navigator.onLine) {
          setMode("offline");
          getAllData();
        }
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div>
        {mode === "offline" && (
          <div className="flex items-center justify-center border bg-red-500 text-white text-bold">
            You are in offline mode, please check your internet!
          </div>
        )}
      </div>
      <div className="flex justify-between px-4 pt-4">
        <h2>Setting</h2>
        {/* <h2
          onClick={() => {
            router.reload();
          }}
        >
          Refresh
        </h2> */}
      </div>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevent default form submission
                uploadData(); // Call your uploadData function
              }}
              className="scroll-smooth md:scroll-auto"
            >
              <div className="mb-6">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Anjali"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Singh"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="john.doe@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span>First Name</span>
            <span className="sm:text-left text-right">Last Name</span>
            <span className="hidden md:grid">Email</span>
          </div>
          <ul>
            {data?.map((details, index) => (
              <li
                key={index}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <p className="text-gray-600 sm:text-left text-right">
                  {details.first_name}
                </p>
                <p className="text-gray-600 sm:text-left text-right">
                  {details.last_name}
                </p>
                <p className="hidden md:flex">{details.email}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
