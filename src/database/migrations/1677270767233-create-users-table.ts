import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1677270767233 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" (
                id serial PRIMARY KEY,
                email varchar(255),
                login varchar(255),
                password varchar(255),
                real_name varchar(255),
                birth_date timestamp,
                "countryId" int REFERENCES country,
                agree_with_terms_and_conditions boolean
            )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
