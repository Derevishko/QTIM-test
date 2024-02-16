import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { DB_TABLE_POST, DB_TABLE_USER } from '@common/constants';

export class CreatePost1708101640229 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DB_TABLE_POST, true);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DB_TABLE_POST,
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
          { name: 'title', type: 'varchar' },
          { name: 'description', type: 'text' },
          { name: 'createdAt', type: 'timestamptz', default: 'now()' },
          { name: 'updatedAt', type: 'timestamptz', default: 'now()' },
          { name: 'createdById', type: 'int', isNullable: true },
          { name: 'updatedById', type: 'int', isNullable: true },
        ],
        foreignKeys: [
          {
            columnNames: ['createdById'],
            referencedTableName: DB_TABLE_USER,
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          },
          {
            columnNames: ['updatedById'],
            referencedTableName: DB_TABLE_USER,
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }
}
