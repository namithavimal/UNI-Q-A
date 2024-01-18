import  {db } from "../dbConnection.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments =(req,res)=>{

      
      const selQuery = "SELECT * from comment AS cmt JOIN student AS std ON (std.studentId =cmt.studentId) WHERE cmt.postId = ? ORDER BY cmt.createTime DESC";

      db.query(selQuery, [req.query.postId], (err,data)=>{
  
          if(err) return res.status(500).json(err);
          return res.status(200).json(data);
          })
   

}
export const addComments =(req,res)=>{

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Student not logged in!");
    
  
    jwt.verify(token, "secretkey", (err, stdInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      //console.log( stdInfo.id)

      //console.log(req.body.postId)
      const insertQuery = "INSERT INTO comment (`commentDesc`, `createTime`, `studentId`, `postId`) VALUES (?)";

        const values = [
            req.body.commentDesc,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            stdInfo.id,
            req.body.postId
          ];
  
      db.query(insertQuery, [values], (err,data)=>{
  
          if(err) return res.status(500).json(err);
          return res.status(200).json("Question has been added");
          })
          
    });


}