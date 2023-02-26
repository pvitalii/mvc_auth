import bcrypt from 'bcrypt';

export class HashService {
  private static instance: HashService;

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, process.env.BCRYPT_SALT!);
  }

  comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  public static getInstance(): HashService {
    if (!HashService.instance) {
      HashService.instance = new HashService();
    }
    return HashService.instance;
  }
}
