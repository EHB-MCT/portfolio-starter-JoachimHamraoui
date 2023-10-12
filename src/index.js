const express = require('express');
const bodyParser = require('body-parser');

const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development); // Use the appropriate environment

// You can export 'db' to use it in other parts of your application
module.exports = db;

const app = express();
const port = 3000;

app.set('db', db);

app.use(bodyParser.json());

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
  
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});