import { User } from 'src/models/user.entity';
import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class CreateAdmin1731033506906 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository: Repository<User> =
      queryRunner.connection.getRepository(User);

    if (await userRepository.findOne({ where: { username: 'admin' } })) {
      return;
    }

    const admin: User = userRepository.create({
      username: 'admin',
      password_hash: await bcrypt.hash('admin123', 10),
    });

    await userRepository.insert(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository: Repository<User> =
      queryRunner.connection.getRepository(User);

    const admin: User = await userRepository.findOne({
      where: { username: 'admin' },
    });

    if (!admin) {
      return;
    }

    await userRepository.remove(admin);
  }
}
