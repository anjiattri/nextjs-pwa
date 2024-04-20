// const express = require("express");
// const app = express();
// // const webpush = require("web-push");
// const cors = require("cors");

// const port = 4000;

// // const apiKeys = {
// //   publicKey:
// //     "BL0X_YqyqiPje-SJkUh863LgBp30kE6hbEZcUVUI2OeuzqKwY3GhvrqAqFSccRUejcU_5y3JGuRNHmqg1cx2V-Y",
// //   privateKey: "LimCR1Fx9K0NyLoA78PcvXsNBL6lW5gtT242pOd6OuQ",
// // };

// // webpush.setVapidDetails(
// //   "mailto:attri2707@gmail.com",
// //   apiKeys.publicKey,
// //   apiKeys.privateKey
// // );
// // const corsOptions = {
// //   origin: "http://localhost:3000",
// // };

// // app.use(cors(corsOptions));
// app.use(cors());

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

// // const subDatabse = [];

// // app.post("/save-subscription", (req, res) => {
// //   subDatabse.push(req.body);
// //   res.json({ status: "Success", message: "Subscription saved!" });
// // });

// // app.get("/send-notification", (req, res) => {
// //   console.log("hojojojo");
// //   webpush.sendNotification(subDatabse[0], "hello world from backend");
// //   res.json({
// //     status: "Success",
// //     message: "Message sent to push service",
// //     data: subDatabse[0],
// //   });
// // });
// const users = [
//   {
//     first_name: "John",
//     last_name: "Doe",
//     email: "johndoe@example.com",
//   },
//   {
//     first_name: "Alice",
//     last_name: "Smith",
//     email: "alicesmith@example.com",
//   },
// ];
// app.get("/users", (req, res) => {
//   res.json({
//     status: "Success",
//     data: users,
//     timestamp: Date.now(),
//   });
// });

// app.post("/users", (req, res) => {
//   const user = req.body;
//   users.push(user);
//   res.json({
//     status: "Success",
//     // data: users,
//     // timestamp: Date.now(),
//   });
// });

// app.listen(port, () => {
//   console.log("Server running on port 4000!");
// });
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const port = 4000;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://anjalisinghfrontenddev:gXx0Jle2ULlbweaX@cluster0.ohf4lb0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define User Schema
const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
});

const profileSchema = new mongoose.Schema({
  name: String,
  dob: String,
  phone: String,
  profile_pic: String,
});

const User = mongoose.model("User", userSchema);
const Profile = mongoose.model("Profile", profileSchema);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      status: "Success",
      data: users,
      timestamp: Date.now(),
    });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
});

// Create a new user
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
});

// Get profile details by user ID
app.get("/profile", async (req, res) => {
  try {
    const profile = await Profile.find();
    res.json({
      status: "Success",
      data: profile,
      timestamp: Date.now(),
    });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
});

// Create profile details for a user
app.post("/profile", async (req, res) => {
  try {
    await Profile.deleteMany();

    const profile = new Profile(req.body);
    await profile.save();
    res.json({
      status: "Success",
      data: profile,
    });
  } catch (error) {
    res.status(400).json({ status: "Error", message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
