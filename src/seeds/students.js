/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// seeds/students.js

exports.seed = function (knex) {
  // Deletes ALL existing entries in the 'students' table
  return knex('students')
    .del()
    .then(function () {
      // Inserts seed entries into the 'students' table
      return knex('students').insert([
        {
          first_name: 'Joachim',
          last_name: 'Hamraoui',
          age: 24,
          email: 'joachimhamraoui@gmail.com',
          created_at: new Date(),
        },
        {
          first_name: 'Amina',
          last_name: 'Amzou',
          age: 21,
          email: 'tangermina@gmail.com',
          created_at: new Date(),
        },
        {
          first_name: 'Bilal',
          last_name: 'Fawaz',
          age: 23,
          email: 'bilalfwz@gmail.com',
          created_at: new Date(),
        },
        // Add more student data here
      ]);
    });
};
