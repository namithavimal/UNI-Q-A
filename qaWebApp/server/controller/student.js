import  {db } from "../dbConnection.js";
import jwt from "jsonwebtoken";

export const updateStd = (req,res)=>{

    console.log("Update student1")
    

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Student not logged in!");
  
    jwt.verify(token, "secretkey", (err, stdInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "UPDATE student SET `studentEmail` = ? ,`studentName` = ? ,`profilePic` = ? WHERE studentId = ?";
      const values = [
        req.body.email,
        req.body.name,
        req.body.profilePic,
        stdInfo.id,
      ];

      db.query(q, values, (err,data)=>{
  
        if(err) return res.status(500).json(err);
        else if (data.affectedRows > 0) return res.json("Updated!");
        })
    });

}