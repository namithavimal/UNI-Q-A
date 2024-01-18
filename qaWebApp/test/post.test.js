const { getPosts } = require('../server/controller/post.js');
import { db } from '../server/dbConnection.js';
import jwt from 'jsonwebtoken';

// Mock the db connection
jest.mock('../server/dbConnection.js', () => ({
    db: {
      query: jest.fn(),
    },
  }));
  

  // Mock the jsonwebtoken library
  jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
    sign: jest.fn()
  }));
  
  describe('getPosts', () => {
    it('returns posts for a specific student ID', async () => {

    // Mock the sign function
    jwt.sign.mockReturnValue('mocked-token');
  
      // Mock the behavior of jwt.verify
      jwt.verify.mockImplementation((token, secretKey, callback) => {
        // Simulate a successful verification
        const decoded = { studentId: mockUserId };
        callback(null, decoded);
      });
  
      console.log('Mock Token:', jwt.sign());
      const req = {
        cookies: {
          accessToken: jwt.sign(),
        },
        query: {
          studentId: '120',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Call the function under test
      await getPosts(req, res);
      //console.log('Mock Token:'+ mockToken);
      console.log('Mock Verify Calls:'+ jwt.verify.mock.calls);
  
      // Check expectations based on your test case
      expect(res.status).toHaveBeenCalledWith(403);
    });
  });