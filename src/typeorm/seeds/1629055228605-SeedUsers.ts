import { getConnection, MigrationInterface } from "typeorm";
import UserService from '../../service/UserService';

export class SeedUsers1629055228605 implements MigrationInterface {
    
  public async up(): Promise<void> {
    const userService = new UserService(); 

    const users = [
      {
        email: 'David_Guetta@gmail.com',
        password: 'David_123',
        firstName: 'David',
        lastName: 'Guetta',
        avatar: 'david_guetta.jpg' 
      },
      {
        email: 'Frank_Sinatra@gmail.com',
        password: 'Frank_123',
        firstName: 'Frank',
        lastName: 'Sinatra',
        avatar: 'frank_sinatra.jpg'
      },
      {
        email: 'Jon_Travolta@gmail.com',
        password: 'Jon_123',
        firstName: 'Jon',
        lastName: 'Travolta',
        avatar: 'Jon_Travolta.jpg'
      },
    ]
  
    await Promise.all(users.map(async (user) => userService.createUser(user)))
  }

  public async down(): Promise<void> {
    const entities = getConnection().entityMetadatas;
    entities.forEach(async entity => {
      const repository = getConnection().getRepository(entity.name);
      await repository.delete({});
    })

    await getConnection().close();
  }
}
