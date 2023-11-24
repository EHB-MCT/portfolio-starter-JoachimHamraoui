const {checkStudentName } = require('./helpers/endpointHelpers')

require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

const db = require("./database/connect_database")


app.get("/", (req,res ) =>{
    res.send("taboundimek")
  })

  // Read all students (GET)
app.get('/students', async (req, res) => {
    try {
      const students = await db('students')

      res.status(200).send(students)
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: "Something went wrong",
        value: error
      });
    }
});

//Read a specific student (GET)
app.get('/student/:id', async (req, res) => {
  const studentId = req.params.id;
  if (studentId >= 0 && studentId < 9999) {
  try {
    const student = await db('students').where('id', studentId).first();

    if(!student) {
      return res.status(404).send({
        error: "Student not found",
      });
    }

    res.status(200).send(student)
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: "Something went wrong",
      value: error
    });
  }
} else {
  res.status(401).json({
    error: "Negative ID provided",

  });
}
  
});

// Post a new student (POST)
app.post('/student', async (req, res) => {
  const {id, first_name, last_name, age, email, created_at} = req.body;

  if (checkStudentName(first_name)) {
    try {
      await db('students').insert({
        id, 
        first_name, 
        last_name, 
        age, email, 
        created_at
      });
  
      res.status(201).send({
        message: 'Student created succesfully'
      });
    } catch (error) {
      console.log(error);
  
      res.status(500).send({
        error: "Something went wrong",
        value: error
      });
    }
  } else {
    res.status(401).send({
      message: "name not formatted correctly"
    })
  }
});

// Delete a specific student (DELETE)
app.delete('/student/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
      // Assuming 'students' is the name of your MySQL table
      const deleteCount = await db('students').where('id', studentId).del();

      if (deleteCount === 0) {
          return res.status(404).send({ error: 'Student not found' });
      }

      res.status(200).send({ message: 'Student deleted successfully' });
  } catch (error) {
      console.error(error);

      res.status(500).send({
          error: 'Something went wrong',
          value: error,
      });
  }
});

// Update a specific student (PUT)
app.put('/student/:id', async (req, res) => {
  const studentId = req.params.id;
  const { first_name, last_name, age, email } = req.body;

  try {
      // Assuming 'students' is the name of your MySQL table
      const updateCount = await db('students')
          .where('id', studentId)
          .update({
              first_name,
              last_name,
              age,
              email,
          });

      if (updateCount === 0) {
          return res.status(404).send({ error: 'Student not found' });
      }

      res.status(200).send({ message: 'Student updated successfully' });
  } catch (error) {
      console.error(error);

      res.status(500).send({
          error: 'Something went wrong',
          value: error,
      });
  }
});

module.exports = app;