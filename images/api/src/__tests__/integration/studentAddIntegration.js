const request = require('supertest'); // supertest for making HTTP requests
const app = require('../../server.js'); // import your Express app
const knexfile = require('../../database/knexfile.js'); // import Knex configuration
const db = require("knex")(knexfile.development);

//docker compose -f ./docker-compose-test.yml up --build

function generateRandomEmail() {
  const usernameLength = 8;
  const domain = 'example.com'; // You can replace this with any domain

  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let username = '';
  for (let i = 0; i < usernameLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    username += characters.charAt(randomIndex);
  }

  return `${username}@${domain}`;
}

const randomEmail = generateRandomEmail();  

const exampleStudent = {

  first_name: 'test',
  last_name: 'integration',
  age: Math.floor(Math.random() * 99),
  email: randomEmail,
}

// Assuming your endpoint is '/student/:id'
describe('POST /student', () => {
  beforeAll(async () => {
    // Set up your database connection and seed test data
    await db.raw('BEGIN');
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await db.destroy();
  });

  test('should return the correct student record', async () => {

    const response = await request(app).post('/student').send(exampleStudent);
    
    const studentResponse = response.body;
    console.log(response.body)

    expect(response.status).toBe(201);

    const dbRecord = await db('students').select("*").first().where("id", 58);
    expect(dbRecord).toHaveProperty('id');
    expect(dbRecord).toHaveProperty('first_name');
    expect(dbRecord).toHaveProperty('last_name');
    expect(dbRecord).toHaveProperty('age');
    expect(dbRecord).toHaveProperty('email');
    expect(dbRecord).toHaveProperty('created_at');
    
    
    // const studentId = 56;
    // const response = await request(app).post(`/student/${studentId}`);
    // expect(response.status).toBe(200);
    // expect(response.body.id).toBe(studentId);

  });

});
