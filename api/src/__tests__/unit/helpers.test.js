const {checkStudentName} = require('../../helpers/endpointHelpers');


test("Check Name", () => {
    expect(checkStudentName("")).toBe(false);
    expect(checkStudentName(null)).toBe(false);
    expect(checkStudentName("i")).toBe(false);
    expect(checkStudentName(0)).toBe(false);
    expect(checkStudentName("ddehdgugdhiuguehzdgyhuyguydegyuez")).toBe(false);
    expect(checkStudentName("joachim")).toBe(true);
    expect(checkStudentName("anne sophie")).toBe(true);
})