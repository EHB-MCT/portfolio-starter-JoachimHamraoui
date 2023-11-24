const request = require('supertest'); // supertest for making HTTP requests
const app = require('../../server.js'); // import your Express app
const knexfile = require('../../database/knexfile.js'); // import Knex configuration
const db = require("knex")(knexfile.development);

//docker compose -f ./docker-compose-test.yml up --build

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

  test('should return the correct student record for a valid ID', async () => {
    
    const studentId = 56; // Replace with the ID of the student you want to test
    const response = await request(app).post(`/student/${studentId}`);
    expect(response.status).toBe(200); // Check if the response status is OK
    // Assuming the response contains student data in JSON format
    expect(response.body.id).toBe(studentId); // Check if the returned ID matches the requested ID
    // Add more expectations to check other fields if needed

    const dbRecord = await db('students').select("*").where("id", studentId)
    expect(dbRecord.length).toBeGreaterThan(0);
    expect(dbRecord[0]).toHaveProperty('id', studentId);


  });

});
