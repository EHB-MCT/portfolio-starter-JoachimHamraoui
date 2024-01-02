const request = require('supertest'); // supertest for making HTTP requests
const app = require('../../server.js'); // import your Express app
const knexfile = require('../../database/knexfile.js'); // import Knex configuration
const db = require("knex")(knexfile.development);

//docker compose -f ./docker-compose-test.yml up --build

const exampleManga = {
  title: 'Test Manga',
  author: 'Kobe lol',
  cover: 'https://m.media-amazon.com/images/I/91rUWaFxAYL._SL1500_.jpg',
  nrOfVolumes: 48,
  read: false,
  favorite: false
}

// Assuming your endpoint is '/student/:id'
describe('POST /manga', () => {
  beforeAll(async () => {
    // Set up your database connection and seed test data
    await db.raw('BEGIN');
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await db.destroy();
  });

  test('should return the correct student record', async () => {

    const response = await request(app).post('/api/mangas').send(exampleManga);
    
    const mangaResponse = response.body;
    console.log(response.body)

    expect(response.status).toBe(201);

    const dbRecord = await db('manga').select("*").first().where("id", mangaResponse.data.id);
    expect(dbRecord).toHaveProperty('id');
    expect(dbRecord).toHaveProperty('title');
    expect(dbRecord).toHaveProperty('author');
    expect(dbRecord).toHaveProperty('cover');
    expect(dbRecord).toHaveProperty('nrOfVolumes');
    expect(dbRecord).toHaveProperty('read');
    expect(dbRecord).toHaveProperty('favorite');
    expect(dbRecord).toHaveProperty('created_at');
    expect(dbRecord).toHaveProperty('updated_at');
    
    
    // const studentId = 56;
    // const response = await request(app).post(`/student/${studentId}`);
    // expect(response.status).toBe(200);
    // expect(response.body.id).toBe(studentId);

  });

});
