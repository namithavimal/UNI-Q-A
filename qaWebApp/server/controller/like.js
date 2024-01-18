import  {db } from "../dbConnection.js";
import jwt from "jsonwebtoken";

    export const getLikes = (req,res)=>{
       
      //console.log("getLikes");
        const q = "SELECT studentId FROM likes WHERE postId = ?";
        //console.log("postid" +req.query.postId);
        
        db.query(q, [req.query.postId], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json(data.map(like =>like.studentId));
        });
    }
    
    // export const addLike = (req, res) => {

    //   console.log("addLikes");
    //   const token = req.cookies.accessToken;
    //   if (!token) return res.status(401).json("Not logged in!");
    
    //   jwt.verify(token, "secretkey", (err, stdInfo) => {
    //     if (err) return res.status(403).json("Token is not valid!");
    //     console.log(stdInfo.id)
    
    //     const q = "INSERT INTO likes (`studentId`,`postId`) VALUES (?)";
    //     const values = [
    //       stdInfo.id,
    //       req.body.postId
    //     ];
    
    //     db.query(q, [values], (err, data) => {
    //       if (err) return res.status(500).json(err);
    //       return res.status(200).json("Post has been liked.");
    //     });
    //   });
    // };

    export const addLikes = (req,res)=>{
       
      //console.log("addLikes");
      const token = req.cookies.accessToken;
      if (!token) return res.status(401).json("Student not logged in!");
      
    
      jwt.verify(token, "secretkey", (err, stdInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
       // console.log("addLikes  " +stdInfo.id)

        //console.log(req.body.postId)
        const insertQuery = "INSERT INTO LIKES (`studentId`,`postId`) VALUES (?)";

          const values = [
              stdInfo.id,
              req.body.postId
            ];
    
        db.query(insertQuery, [values], (err,data)=>{
    
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post has been liked");
            })
            
      });
    }

    export const deleteLikes = (req,res)=>{
       
      const token = req.cookies.accessToken;
      if (!token) return res.status(401).json("Student not logged in!");
      
    
      jwt.verify(token, "secretkey", (err, stdInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        const delQuery = "DELETE FROM LIKES WHERE `studentId` = ? AND `postId` = ?";
    
        db.query(delQuery, [stdInfo.id, req.query.postId], (err,data)=>{
    
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post has been unliked");
            })
            
      });
    }
    
    
