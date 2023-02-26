import { MigrationInterface, QueryRunner } from 'typeorm';
import fs from 'fs/promises';

async function readCountriesFromTxt() {
  try {
    const data = await fs.readFile('src/countries.txt', { encoding: 'utf8' });
    return data.split('\r\n');
  } catch (err) {
    console.log(err);
  }
}

export class createCountriesTable1677270723350 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "country" (
                id serial PRIMARY KEY,
                name varchar(255)
            )`
    );

    const countries = await readCountriesFromTxt();
    if (!countries) return;
    for (const name of countries) {
      await queryRunner.query(`INSERT INTO "country"("name") VALUES ('${name}')`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "country"`);
  }
}
