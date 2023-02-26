import { PostgresDataSource } from '../../database/app-data-source';
import { Country } from './country.entity';

export class CountryService {
  constructor(private countryRepository = PostgresDataSource.manager.getRepository(Country)) {}

  findAll(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  findById(id: number): Promise<Country | null> {
    return this.countryRepository.findOneBy({ id });
  }
}
