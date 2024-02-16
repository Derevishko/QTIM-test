import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { DB_TABLE_USER } from '@common/constants';
import { UQ_USER_EMAIL } from '@db/constraint';

export class CreateUser1708096673257 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DB_TABLE_USER);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DB_TABLE_USER,
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
          { name: 'email', type: 'varchar' },
          { name: 'password', type: 'varchar' },
          {
            name: 'createdAt',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
        uniques: [UQ_USER_EMAIL],
        foreignKeys: [],
      }),
      true,
    );
  }
}
