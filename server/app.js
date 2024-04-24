const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const aws = require("aws-sdk");

const port = process.env.PORT || 4000; // Use process.env.PORT for dynamic port
console.log("por", port);
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

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1", // Specify the AWS region where your S3 bucket is located
});
const s3 = new aws.S3();
const upload = multer();

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
// const upload = multer({ storage });
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
  console.log("hi");

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${Date.now()}_${path.basename(req.file.originalname)}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
    // ACL: "public-read", // Set the ACL (Access Control List) to public-read for public access to uploaded files
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      console.error("Error uploading file to S3:", err);
      return res.status(500).json({ error: "Failed to upload file" });
    }

    try {
      await Profile.deleteMany();
      // Perform MongoDB operations after successful upload to S3
      const profile = new Profile({
        name: req.body.name,
        dob: req.body.dob,
        phone: req.body.phone,
        file: data.Location,
      });

      // Save the profile to the database
      await profile.save();

      // Return response with the uploaded file URL
      res.json({
        status: "Success",
        data: profile,
        url: data.Location, // Include S3 object URL in the response
      });
    } catch (error) {
      console.error("Error storing profile in database:", error);
      return res
        .status(500)
        .json({ error: "Failed to store profile in database" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
