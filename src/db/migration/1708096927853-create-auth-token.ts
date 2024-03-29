import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import {
  DB_TABLE_AUTH_TOKEN,
  DB_TABLE_USER,
  IDX_TOKEN,
} from '@common/constants';

export class CreateAuthToken1708096927853 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DB_TABLE_AUTH_TOKEN);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DB_TABLE_AUTH_TOKEN,
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
          { name: 'userId', type: 'int' },
          { name: 'jti', type: 'varchar' },
          { name: 'isRevoked', type: 'bool', default: false },
          { name: 'ip', type: 'varchar', isNullable: true },
          { name: 'os', type: 'varchar', isNullable: true },
          { name: 'browser', type: 'varchar', isNullable: true },
          { name: 'userAgent', type: 'varchar', isNullable: true },
          { name: 'expiredAt', type: 'timestamptz' },
          { name: 'createdAt', type: 'timestamptz', default: 'now()' },
          { name: 'updatedAt', type: 'timestamptz', default: 'now()' },
        ],
        foreignKeys: [
          {
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: DB_TABLE_USER,
            onDelete: 'CASCADE',
          },
        ],
        indices: [{ columnNames: IDX_TOKEN }],
      }),
      true,
    );
  }
}
