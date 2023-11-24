const request = require('supertest'); // supertest for making HTTP requests
const app = require('../../server.js'); // import your Express app
const knexfile = require('../../database/knexfile.js'); // import Knex configuration
const db = require("knex")(knexfile.development);

// Assuming your endpoint is '/student/:id'
describe('GET /student/:id', () => {
  beforeAll(async () => {
    // Set up your database connection and seed test data
    await db.raw('BEGIN');
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await db.destroy();
  });

  it('should return the correct student record for a valid ID', async () => {
    const studentId = 55; // Replace with the ID of the student you want to test

    const response = await request(app).get(`/student/${studentId}`);

    expect(response.status).toBe(200); // Check if the response status is OK

    // Assuming the response contains student data in JSON format
    expect(response.body.id).toBe(studentId); // Check if the returned ID matches the requested ID
    // Add more expectations to check other fields if needed
  });

  it('should return 404 for an invalid ID', async () => {
    const invalidStudentId = 999; // An ID that does not exist in the test data

    const response = await request(app).get(`/student/${invalidStudentId}`);
    expect(response.status).toBe(404); // Check if the response status is 404 for an invalid ID
  });
});
