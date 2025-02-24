const express = require("express");
const db = require("./db");
// const cors=require('cors')
const app = express();
// app.use(express.static(Path.join(__dirname,'publish')))
// express.use(cors())
app.use(express.json());

// Get All student
app.get("/students",(req,res)=>{
    db.query("SELECT * FROM student_details",(err,results)=>{
        if(err) return res.status(500).json({err:err.message})
            res.json(results);
    })
})

// get single id
app.get("/students/:id",(req,res)=>{
    const {id}=req.params;
    db.query('SELECT * FROM student_details WHERE student_id = ?',[id],(err,result)=>{
        if(err) return res.status(500).json({error:err.message});
        if(result.length===0) return res.status(404).json({message:"student not fount"});
        res.json(result[0])
    });
});

// Add User
app.post("/users", (req, res) => {
    const { name, email } = req.body;
    db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User added successfully", id: results.insertId });
    });
});
// Add Student
app.post("/students", (req, res) => {
    const { first_name, last_name, email, phone, date_of_birth, gender, address } = req.body;
    db.query(
        "INSERT INTO student_details (first_name, last_name, email, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [first_name, last_name, email, phone, date_of_birth, gender, address],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Student added successfully", id: results.insertId });
        }
    );
});
// Update Student
app.put("/students/:id", (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone, date_of_birth, gender, address } = req.body;
    db.query(
        "UPDATE student_details SET first_name=?, last_name=?, email=?, phone=?, date_of_birth=?, gender=?, address=? WHERE student_id=?",
        [first_name, last_name, email, phone, date_of_birth, gender, address, id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.affectedRows === 0) return res.status(404).json({ message: "Student not found" });
            res.json({ message: "Student updated successfully" });
        }
    );
});

// Delete Student
app.delete("/students/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM student_details WHERE student_id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: "Student not found" });
        res.json({ message: "Student deleted successfully" });
    });
});




app.get("/", (req, res) => {
    console.log("my database");
    res.send("Welcome to the User API");
});
// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
