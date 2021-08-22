import supertest from 'supertest';
import app from '../../src/server';
import DatabaseUtils from '../utils/DatabaseUtils';

describe('auth controller', () => {
  let request: any;
  let resToken: string;
  const databaseUtils = new DatabaseUtils();
  const mockUser = {
    email: 'jon_lenon@gmail.com',
    password: 'Jon_123',
    firstName: 'Jon',
    lastName: 'Lenon',
    avatar: 'localhost:3000/file/uploads/jon_lenon.jpg',
  };

  beforeAll(async () => {
    request = supertest(app);
    await databaseUtils.dbCreateConnection();
    await databaseUtils.createUserSchema();
  });

  afterAll(async () => {
    databaseUtils.dropUserSchema();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const res = await request.post('api/auth/register')
        .field({
          email: mockUser.email,
          password: mockUser.password,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          avatar: mockUser.avatar,
        })
        .attach('avatar', 'test/images/test_img1.jpg');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          email: mockUser.email,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          avatar: mockUser.avatar,
        }),
      );
    });

    it('should return Validation error if missed email', async () => {
      const res = await request.post('api/auth/register')
        .field({
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          password: mockUser.password,
        })
        .attach('avatar', 'test/images/test_img1.jpg');

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Validation error');
    });

    it('should return error \'Image uploaded is not of type jpg/jpeg or png\'', async () => {
      const res = await request.post('api/auth/register')
        .field({
          email: mockUser.email,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          password: mockUser.password,
        })
        .attach('avatar', 'test/images/test_img2.txt');

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Image uploaded is not of type jpg/jpeg or png');
    });

    it(`should return error 'User with email ${mockUser.email} already exists!'`, async () => {
      const res = await request.post('api/auth/register')
        .field({
          email: mockUser.email,
          password: mockUser.password,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
        })
        .attach('avatar', 'test/images/test_img1.jpg');

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', `User with email ${mockUser.email} already exists!`);
    });
  });

  describe('login', () => {
    it('should login user', async () => {
      const res = await request.post('api/auth/login').send(mockUser);
      resToken = res.body.token;
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should return Validation error if missed email', async () => {
      const res = await request.post('api/auth/login').send({
        password: mockUser.password,
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Validation error');
    });

    it('should return error \'User was not found\'', async () => {
      const res = await request.post('api/auth/login').send({
        email: 'test_email@gmail.com',
        password: 'Test_123',
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'User was not found');
    });

    it('should return error \'Password is\'t corect\'', async () => {
      const res = await request.post('api/auth/login').send({
        email: mockUser.email,
        password: 'Test_123',
      });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Password is\'t corect');
    });
  });

  describe('change password', () => {
    it('should return Validation error if missed oldPassword', async () => {
      const res = await request.put('api/auth/change-password')
        .set('Authorization', `Bearer ${resToken}`)
        .send({ newPassword: 'Test_123' });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Validation error');
    });

    it('should return error \'Current password is not correct\'', async () => {
      const res = await request.put('api/auth/change-password')
        .set('Authorization', `Bearer ${resToken}`)
        .send({
          oldPassword: 'Jony_123',
          newPassword: 'Test_123',
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Current password is not correct');
    });

    it('should return error \'New password must differ from previous\'', async () => {
      const res = await request.put('api/auth/change-password')
        .set('Authorization', `Bearer ${resToken}`)
        .send({
          oldPassword: 'Jon_123',
          newPassword: 'Jon_123',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'New password must differ from previous');
    });

    it('should change user password', async () => {
      const res = await request.put('api/auth/change-password')
        .set('Authorization', `Bearer ${resToken}`)
        .send({
          oldPassword: 'Jon_123',
          newPassword: 'Test_123',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Password successfully changed.');
    });
  });
});
