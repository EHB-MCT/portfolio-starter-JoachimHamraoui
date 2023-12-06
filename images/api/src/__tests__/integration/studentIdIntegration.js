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
    const response = await request(app).get(`/student/${studentId}`);
    expect(response.status).toBe(200); // Check if the response status is OK
    // Assuming the response contains student data in JSON format
    expect(response.body.id).toBe(studentId); // Check if the returned ID matches the requested ID
    // Add more expectations to check other fields if needed

    const dbRecord = await db('students').select("*").where("id", studentId)
    expect(dbRecord.length).toBeGreaterThan(0);
    expect(dbRecord[0]).toHaveProperty('id', studentId);


  });

  test('should return 404 for an invalid ID', async () => {
    const invalidStudentId = 999; // An ID that does not exist in the test data

    const response = await request(app).get(`/student/${invalidStudentId}`);
    expect(response.status).toBe(404); // Check if the response status is 404 for an invalid ID

    const dbRecord = await db('students').select("*").where("id", invalidStudentId)
    expect(dbRecord.length).toBe(0);

  });

  test('should return 401 for negative ID', async () => {
    const negativeStudentId = -12; // An ID that does not exist in the test data

    const response = await request(app).get(`/student/${negativeStudentId}`);
    expect(response.status).toBe(401); // Check if the response status is 404 for an invalid ID
  });

  test('should return 401 for negative ID', async () => {
    const negativeStudentId = "test"; // An ID that does not exist in the test data

    const response = await request(app).get(`/student/${negativeStudentId}`);
    expect(response.status).toBe(401); // Check if the response status is 404 for an invalid ID
  });

  test('should return 401 for too large ID', async () => {
    const tooLargeStudentId = 9999; // An ID that does not exist in the test data

    const response = await request(app).get(`/student/${tooLargeStudentId}`);
    expect(response.status).toBe(401); // Check if the response status is 404 for an invalid ID
  });
});
