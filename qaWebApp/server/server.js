const express = require ('express');
const mysql2 = require('mysql2');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors())

const db = mysql2.createConnection({
    host :"localhost",
    user :"root",
    password : "anoop",
    database : "qaapp"
})

app.post('/Login',(req,res)=>{
    const sql = "SELECT * FROM student WHERE studentemail= ? AND studentpass= ?";

    db.query(sql, [req.body.email,req.body.password], (err,data)=>{
        if(err) return res.json("Error");
        if(data.length>0){
            console.log("haiisaasd")
            res.json({ redirect: '/Home' });
        }
        else{
            return res.json("Login Failed");
        }
        //return res.json(data);
    })
})

app.listen(8081,()=>{

    console.log("Listening.....")

})