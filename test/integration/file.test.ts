import supertest from 'supertest';
import app from '../../src/server';

let request: any;
beforeAll(async () => {
  request = supertest(app);
});

describe('file controller', () => {
  describe('getFile', () => {
    it('should return all users', async () => {
      const res = await request.get('api/file/uploads/jon_lenon.jpg');

      expect(res.statusCode).toEqual(200);
    });

    it('should return error \'File was not found\'', async () => {
      const res = await request.get('api/file/uploads/test.jpg');

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'File was not found');
    });
  });
});
