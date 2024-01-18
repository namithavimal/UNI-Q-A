const { register } = require('../server/controller/studentAuth.js');

jest.mock('../server/dbConnection.js', () => ({
  db: {
    query: jest.fn(),
  },
}));

describe('register', () => {
  it('registers a new student', async () => {
    const req = {
      body: {
        studentId: '123',
        studentEmail: 'test@example.com',
        studentName: 'John Doe',
        studentPass: 'password123',
      },
      cookies: {
        accessToken: 'validToken',
      },
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

    // Assuming db.query should return an empty array (no existing user)
    require('../server/dbConnection.js').db.query.mockImplementationOnce((sql, params, callback) =>
      callback(null, []),
    );

    await register(req, res);
    console.log('Response:'+ res.status.mock.calls);

    expect(res.status.mock.calls.length).toBe(0); // Check the number of calls
  });

  it('returns a conflict status if the student already exists', async () => {
    const req = {
      body: {
        studentEmail: 'existing@example.com',
      },
      cookies: {
        accessToken: 'validToken',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Assuming db.query should return a non-empty array (existing user)
    require('../server/dbConnection.js').db.query.mockImplementationOnce((sql, params, callback) =>
      callback(null, [{ studentEmail: 'existing@example.com' }]),
    );

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith('Student already exists!');
  });

  // Add more test cases as needed
});