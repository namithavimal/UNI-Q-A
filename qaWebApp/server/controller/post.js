import  {db } from "../dbConnection.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// Get all the questions posted by students 
// export const getPosts =(req,res)=>{

//   const selectedCategory = req.query.category; // Access the selected category from query parameters 
//   let selQuery = null;
//   console.log(req.query.stdId);

  
//     const token = req.cookies.accessToken;
//     if (!token) return res.status(401).json("Student not logged in!");
  
//     jwt.verify(token, "secretkey", (err, stdInfo) => {
//       if (err) return res.status(403).json("Token is not valid!");
//       if(selectedCategory==null || selectedCategory =="ALL"){
//         console.log(selectedCategory)
//         selQuery = "SELECT * from post AS post JOIN student AS std ON (std.studentId=post.studentId) ORDER BY post.postTime DESC"
//         db.query(selQuery, [req.body.studentId],(err,data)=>{
  
//           if(err) return res.status(500).json(err);
//           return res.status(200).json(data);
//           })

//       }      
//       else{
//         console.log(selectedCategory)
//         selQuery = "SELECT * from post AS post JOIN student AS std ON (std.studentId=post.studentId) WHERE post.postCategory = ?  ORDER BY post.postTime DESC"
//         db.query(selQuery, [selectedCategory, req.body.studentId],(err,data)=>{
  
//           if(err) return res.status(500).json(err);
//           return res.status(200).json(data);
//           })
//       }
         
//     });



// }

export const getPosts =(req,res)=>{

  const selectedCategory = req.query.category; // Access the selected category from query parameters 
  let selQuery = null;
  // console.log(req.query.stdId);

  
    const token = req.cookies.accessToken;
    console.log(token);
    if (!token) return res.status(401).json("Student not logged in!");
  
    jwt.verify(token, "secretkey", (err, stdInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
        
        // selQuery = "SELECT * from post AS post JOIN student AS std ON (std.studentId=post.studentId) ORDER BY post.postTime DESC"
        // db.query(selQuery, [req.body.studentId],(err,data)=>{
  
        //   if(err) return res.status(500).json(err);
        //   return res.status(200).json(data);
        //   }) 

        const { stdId } = req.query;

    if (stdId) {
      // If stdId is provided, filter posts based on the user ID
      selQuery = "SELECT * from post AS post JOIN student AS std ON (std.studentId=post.studentId) WHERE post.studentId = ? ORDER BY post.postTime DESC";
      db.query(selQuery, [stdId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    } else {
      // If stdId is not provided, return all posts
      selQuery = "SELECT * from post AS post JOIN student AS std ON (std.studentId=post.studentId) ORDER BY post.postTime DESC";
      db.query(selQuery,[req.body.studentId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    }
    });
}

// Store and update the question posted by students 
export const addPost =(req,res)=>{

  // console.log(req.body.postCategory);

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Student not logged in!");
    
  
    jwt.verify(token, "secretkey", (err, stdInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      // console.log( stdInfo.id)

      const insertQuery = "INSERT INTO post (`postsDesc`, `postImg`, `studentId`, `postTime`,`postCategory`) VALUES (?)";

        const values = [
            req.body.postsDesc,
            req.body.postImg,
            stdInfo.id,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            req.body.postCategory
          ];
  
      db.query(insertQuery, [values], (err,data)=>{
  
          if(err) return res.status(500).json(err);
          return res.status(200).json("Question has been added");
          })
  

    });
    

}

// Delete the question posted by the student 
export const deletePost =(req,res)=>{

  // console.log(req.body.postCategory);

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Student not logged in!");
    
  
    jwt.verify(token, "secretkey", (err, stdInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      

      const delQuery = "DELETE FROM post WHERE `id` = ? AND `studentId` = ? ";

  
      db.query(delQuery, [req.params.id, stdInfo.id], (err,data)=>{
  
        if (err) return res.status(500).json(err);
        if(data.affectedRows>0) return res.status(200).json("Question has been deleted.");
        return res.status(403).json("You can delete only your Question")
      })
  

    });
    

}

