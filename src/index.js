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
  
});

// Post a new student (POST)
app.post('/student', async (req, res) => {
  const {id, first_name, last_name, age, email, created_at} = req.body;

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});