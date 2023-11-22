const {checkStudentName} = require('../helpers/endpointHelpers');

// table.increments('id').primary();
//       table.uuid('UUID');
//       table.string('first_name').notNullable();
//       table.string('last_name').notNullable();
//       table.integer('age').notNullable();
//       table.string('email').unique().notNullable();
//       table.timestamp('created_at').defaultTo(knex.fn.now());
test("Check Name", () => {
    expect(checkStudentName("")).toBe(false);
    expect(checkStudentName(null)).toBe(false);
    expect(checkStudentName("i")).toBe(false);
    expect(checkStudentName(0)).toBe(false);
    expect(checkStudentName("ddehdgugdhiuguehzdgyhuyguydegyuez")).toBe(false);
    expect(checkStudentName("joachim")).toBe(true);
    expect(checkStudentName("anne sophie")).toBe(true);
})