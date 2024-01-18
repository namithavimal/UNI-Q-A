import express from "express";
const app = express();
import stdAuthRoutes from "./routes/studentAuth.js";
import studentRoutes from "./routes/students.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import  {db } from "./dbConnection.js";

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
  }))
app.use(cookieParser())



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
     cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {

  console.log("indexdsfaasad");
  console.log("inde"+req.file);
  const file = req.file;
  console.log("indexdfile"+file);
  if (!file) {
    return res.status(400).json({ error: 'Invalid file upload.' });
  }
  res.status(200).json(file.filename);
//   if (!req.file || !req.file.path) {
//     return res.status(400).json({ error: 'Invalid file upload.' });
//   }
//   const file = req.file;
//   console.log(file);
//   // res.status(200).json(file.filename);
//   const studentId = req.body.studentId;
//   const filePath = file.path;
//   console.log(filePath);


//   const q = "UPDATE student SET `profilePic` = ? WHERE `studentId` =? ";


// db.query(q, [filePath,studentId], (err,data)=>{

//   if(err) return res.status(500).json(err);
//   return res.status(200).json("Post has been liked");
//   });
});

app.use("/api/students",studentRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/comments",commentRoutes)
app.use("/api/likes",likeRoutes)
app.use("/api/stdAuth",stdAuthRoutes)


app.listen(8080,()=>{

    console.log("Server Side Working")

})