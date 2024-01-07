const request = require('supertest'); // supertest for making HTTP requests
const app = require('../../server.js'); // import your Express app
const knexfile = require('../../database/knexfile.js'); // import Knex configuration
const db = require("knex")(knexfile.development);

//docker compose -f ./docker-compose-test.yml up --build

// Assuming your endpoint is '/student/:id'
describe('GET /api/mangas/:id', () => {
  beforeAll(async () => {
    // Set up your database connection and seed test data
    await db.raw('BEGIN');
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await db.destroy();
  });

  test('should return the correct manga for a valid ID', async () => {
    
    const mangaId = 45; // Replace with the ID of the student you want to test
    const response = await request(app).get(`/api/mangas/${mangaId}`);
    expect(response.status).toBe(200); // Check if the response status is OK
    // Assuming the response contains student data in JSON format
    expect(response.body.id).toBe(mangaId); // Check if the returned ID matches the requested ID
    // Add more expectations to check other fields if needed

    const dbRecord = await db('manga').select("*").where("id", mangaId)
    expect(dbRecord.length).toBeGreaterThan(0);
    expect(dbRecord[0]).toHaveProperty('id', mangaId);


  });

  test('should return 404 for an invalid ID', async () => {
    const invalidMangaId = 999; // An ID that does not exist in the test data

    const response = await request(app).get(`/api/mangas/${invalidMangaId}`);
    expect(response.status).toBe(404); // Check if the response status is 404 for an invalid ID

    const dbRecord = await db('manga').select("*").where("id", invalidMangaId)
    expect(dbRecord.length).toBe(0);

  });

  test('should return 404 for negative ID', async () => {
    const negativeMangaId = -12; // An ID that does not exist in the test data

    const response = await request(app).get(`/api/mangas/${negativeMangaId}`);
    expect(response.status).toBe(404); // Check if the response status is 404 for an invalid ID
  });

  test('should return 500 for non-integer ID', async () => {
    const nonIntegerMangaId = "test"; // An ID that does not exist in the test data

    const response = await request(app).get(`/api/mangas/${nonIntegerMangaId}`);
    expect(response.status).toBe(500); // Check if the response status is 404 for an invalid ID
  });

  test('should return 404 for too large ID', async () => {
    const tooLargeMangaId = 9999; // An ID that does not exist in the test data

    const response = await request(app).get(`/student/${tooLargeMangaId}`);
    expect(response.status).toBe(404); // Check if the response status is 404 for an invalid ID
  });
});
