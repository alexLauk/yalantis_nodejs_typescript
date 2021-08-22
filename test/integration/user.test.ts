import { plainToClass } from 'class-transformer';
import supertest from 'supertest';
import app from '../../src/server';
import UserService from '../../src/service/UserService';
import UserViewDTO from '../../src/dto/UserViewDTO';
import generateToken from '../../src/utils/generateToken';
import DatabaseUtils from '../utils/DatabaseUtils';

describe('user controller', () => {
  let request: any;
  let users: UserViewDTO[];
  let token: string;
  const databaseUtils = new DatabaseUtils();
  const usersCreate = [
    {
      email: 'David_Guetta@gmail.com',
      password: 'David_123',
      firstName: 'David',
      lastName: 'Guetta',
      avatar: 'david_guetta.jpg',
    },
    {
      email: 'Frank_Sinatra@gmail.com',
      password: 'Frank_123',
      firstName: 'Frank',
      lastName: 'Sinatra',
      avatar: 'frank_sinatra.jpg',
    },
    {
      email: 'Jon_Travolta@gmail.com',
      password: 'Jon_123',
      firstName: 'Jon',
      lastName: 'Travolta',
      avatar: 'Jon_Travolta.jpg',
    },
  ];

  beforeAll(async () => {
    request = supertest(app);
    await databaseUtils.dbCreateConnection();
    await databaseUtils.createUserSchema();

    const userService = new UserService();
    const userTests = await Promise.all(
      usersCreate.map(async (user) => userService.createUser(user)),
    );
    users = userTests.sort((a, b) => b.id - a.id)
      .map((user) => plainToClass(UserViewDTO, user, { excludeExtraneousValues: true }));

    token = await generateToken(
      { id: userTests[0].id, email: userTests[0].email },
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRATION,
    );
  });

  afterAll(async () => {
    databaseUtils.dropUserSchema();
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      const res = await request.get('api/user')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(users);
    });

    it('should return all users if pass valid skip/take', async () => {
      const res = await request.get('api/user')
        .set('Authorization', `Bearer ${token}`)
        .query({ skip: 0, take: 3 });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(users);
    });

    it('should return 1 user if pass take = 1', async () => {
      const res = await request.get('api/user')
        .set('Authorization', `Bearer ${token}`)
        .query({ take: 1 });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([users[0]]);
    });

    it('should return 2 users if pass skip = 1', async () => {
      const res = await request.get('api/user')
        .set('Authorization', `Bearer ${token}`)
        .query({ skip: 1 });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([users[1], users[2]]);
    });

    it('should return Validation error if pass invalid skip', async () => {
      const res = await request.get('api/user')
        .set('Authorization', `Bearer ${token}`)
        .query({ skip: -1 });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Validation error');
    });

    it('should return Validation error if pass invalid take', async () => {
      const res = await request.get('api/user')
        .set('Authorization', `Bearer ${token}`)
        .query({ take: 0 });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Validation error');
    });
  });

  describe('getbyID', () => {
    it('should return user by ID', async () => {
      const res = await request.get('api/user/1')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(users[2]);
    });

    it('should return error \'User was not found\' ', async () => {
      const res = await request.get('api/user/10')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'User was not found');
    });
  });

  describe('update', () => {
    it('should return updated user', async () => {
      const res = await request.put('api/user')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Firstname',
          lastName: 'LastName',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        email: users[0].email,
        firstName: 'Firstname',
        lastName: 'LastName',
        avatar: users[0].avatar,
      });
    });

    it('should return Validation error', async () => {
      const res = await request.put('api/user')
        .set('Authorization', `Bearer ${token}`)
        .send({ firstName: 'Firstname' });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Validation error');
    });
  });

  describe('deleteByID', () => {
    it('should return deleted user', async () => {
      const res = await request.delete('api/user/2')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(users[1]);
    });

    it('should return error \'User was not found\'', async () => {
      const res = await request.delete('api/user/2')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'User was not found');
    });
  });
});
