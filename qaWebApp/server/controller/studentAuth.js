import  {db } from "../dbConnection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register =(req,res)=>{
    
    // check student if currently 

    const sql = "SELECT * FROM student WHERE studentEmail= ?";
     db.query(sql,[req.body.studentEmail],(err,data)=>{
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("Student already exists!");

        // password hashing
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.studentPass, salt);

        // Insert query registration
        const insertQuery ="INSERT INTO student (`studentId`,`studentEmail`,`studentName`,`studentPass`) VALUE (?)";
        

        const values = [
        req.body.studentId,
        req.body.studentEmail,
        req.body.studentName,
        hashedPassword
        ];

        db.query(insertQuery, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Student Account has been created.");
        });

     });
};

export const login =(req,res)=>{

    const q = "SELECT * FROM student WHERE studentEmail = ?";

    db.query(q, [req.body.studentEmail], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("Student not found!");
  
      const checkPassword = bcrypt.compareSync(
        req.body.studentPass,
        data[0].studentPass
      );
  
      if (!checkPassword)
        return res.status(400).json("Wrong password or Student!");
  
      const token = jwt.sign({ id: data[0].studentId }, "secretkey");
      console.log("token" +token);
  
      const { studentPass, ...others } = data[0];
  
      res.cookie("accessToken", token, {
          httpOnly: true,
          path: "/", // Ensure the path matches
          secure: true,
          sameSite: "none",
        }).status(200)
        .json(others);
    });

}



export const logout =(req,res)=>{

  console.log("logout");
    res.clearCookie("accessToken",{
      path: "/", // Ensure the path matches
      secure: true,
      sameSite: "none",
      }).status(200).json("User has been logged out.")
    
}

