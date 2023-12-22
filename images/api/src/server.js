require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

const db = require("./database/connect_database");

// Defining routes
const manga = require("./routes/manga.route");

// Use defined routes
app.use("/api/mangas", manga);


app.get("/", (req,res ) =>{
    res.send("taboundimek")
  })

    // Read all students (GET)
// app.get('/students', async (req, res) => {
//     try {
//       const students = await db('students')

//       res.status(200).send(students)
//     } catch (error) {
//       console.log(error);

//       res.status(500).send({
//         error: "Something went wrong",
//         value: error
//       });
//     }
// });

//Read a specific student (GET)
// app.get('/student/:id', async (req, res) => {
//   const studentId = req.params.id;
//   if (studentId >= 0 && studentId < 9999) {
//   try {
//     const student = await db('students').where('id', studentId).first();

//     if(!student) {
//       return res.status(404).send({
//         error: "Student not found",
//       });
//     }

//     res.status(200).send(student)
//   } catch (error) {
//     console.log(error);

//     res.status(500).send({
//       error: "Something went wrong",
//       value: error
//     });
//   }
// } else {
//   res.status(401).json({
//     error: "Negative ID provided",

//   });
// }
  
// });

// Post a new student (POST)
// app.post('/student', async (req, res) => {
//   const { id, first_name, last_name, age, email, created_at } = req.body;

//   try {
//     const insertedRecord = await db('students')
//       .insert({
//         id,
//         first_name,
//         last_name,
//         age,
//         email,
//         created_at
//       })
//       .returning('id'); // Explicitly specify the column to return

//     const insertedId = insertedRecord[0]; // Assuming returning() returns an array

//     res.status(201).send({
//       data: insertedRecord, // Send the inserted ID back in the response
//       message: 'Student created successfully'
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).send({
//       error: 'Something went wrong',
//       value: error
//     });
//   }
// });

// Delete a specific student (DELETE)
// app.delete('/student/:id', async (req, res) => {
//   const studentId = req.params.id;

//   try {
//       // Assuming 'students' is the name of your MySQL table
//       const deleteCount = await db('students').where('id', studentId).del();

//       if (deleteCount === 0) {
//           return res.status(404).send({ error: 'Student not found' });
//       }

//       res.status(200).send({ message: 'Student deleted successfully' });
//   } catch (error) {
//       console.error(error);

//       res.status(500).send({
//           error: 'Something went wrong',
//           value: error,
//       });
//   }
// });

// Update a specific student (PUT)
// app.put('/student/:id', async (req, res) => {
//   const studentId = req.params.id;
//   const { first_name, last_name, age, email } = req.body;

//   try {
//       // Assuming 'students' is the name of your MySQL table
//       const updateCount = await db('students')
//           .where('id', studentId)
//           .update({
//               first_name,
//               last_name,
//               age,
//               email,
//           });

//       if (updateCount === 0) {
//           return res.status(404).send({ error: 'Student not found' });
//       }

//       res.status(200).send({ message: 'Student updated successfully' });
//   } catch (error) {
//       console.error(error);

//       res.status(500).send({
//           error: 'Something went wrong',
//           value: error,
//       });
//   }
// });

module.exports = app;