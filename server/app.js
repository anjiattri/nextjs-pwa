const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const port = 4000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
  file: String,
});

const User = mongoose.model("User", userSchema);
const Profile = mongoose.model("Profile", profileSchema);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("Hello world");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../public/images");
  },
  filename: function (req, file, cb) {
    return cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });
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
app.post("/profile", upload.single("file"), async (req, res) => {
  // console.log("file-->", req.body, req.file.filename); // Logging the file name
  try {
    await Profile.deleteMany();

    const profile = new Profile({
      name: req.body.name,
      dob: req.body.dob,
      phone: req.body.phone,
      file: req?.file?.filename || req?.body?.file,
    });
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
