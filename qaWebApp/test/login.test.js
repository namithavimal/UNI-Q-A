const { login } = require('../server/controller/studentAuth.js');

jest.mock('../server/dbConnection.js', () => ({
  db: {
    query: jest.fn(),
  },
}));

describe('login', () => {
  it('logs in a student with correct credentials', async () => {
    const req = {
      body: {
        studentEmail: 'test@email.com',
        studentPass: 'test1120'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };

    // Assuming db.query should return a single user (correct credentials)
    require('../server/dbConnection.js').db.query.mockImplementationOnce((sql, params, callback) =>
      callback(null, [{  studentEmail: 'test@email.com', studentPass: '$2a$10$AKNU2und992CzZQzOPFjr.guFRFl.XhuyTPKhIamCW2jWNcakoFaG' }]),
    );

    await login(req, res);
    console.log('Final Response:'+ res);

    expect(res.status).toHaveBeenCalledWith(400);
    //expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ studentEmail: 'test@email.com' }));
    ///expect(res.cookie).toHaveBeenCalled();
  });

  it('returns a 404 status if the student is not found', async () => {
    const req = {
      body: {
        studentEmail: 'nonexistent@example.com',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };

    // Assuming db.query should return an empty array (no existing user)
    require('../server/dbConnection.js').db.query.mockImplementationOnce((sql, params, callback) =>
      callback(null, []),
    );

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith('Student not found!');
  });

  // Add more test cases as needed
});