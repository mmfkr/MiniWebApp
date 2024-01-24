const request = require('supertest');
const app = require('./uniAPI'); // Adjust the path if necessary

describe('University API Tests', () => {
  let testUniversityId;

 

  // Test GET (Read)
  it('should get all universities', async () => {
    const response = await request(app).get('/university');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBeTruthy();
  });

  

  // Test DELETE (Delete)
  it('should delete the test university', async () => {
    const response = await request(app).delete(`/university/${testUniversityId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'University deleted successfully');
  });

});
