import { Request, Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { HashService } from './services/hash.service';
import { TokenService } from './services/token.service';
import { UserService } from '../user/user.service';
import { plainToClass } from 'class-transformer';
import { UserSerializer } from '../user/user-serializer';
import { CountryService } from '../country/country.service';

export class AuthController {
  constructor(
    private userService = new UserService(),
    private countryService = new CountryService(),
    private hashService = HashService.getInstance(),
    private tokenService = TokenService.getInstance()
  ) {}

  private putTokenIntoCookie(token: string, res: Response) {
    res.cookie('accessToken', token, {
      httpOnly: true,
      maxAge: Number(process.env.ACCESS_TOKEN_EXPIRATION)
    });
  }

  async registration(req: Request<unknown, unknown, CreateUserDto>, res: Response) {
    if (req.session.errors?.length) {
      req.session.registerBody = req.body;
      const country = await this.countryService.findById(req.session.registerBody.countryId);
      if (country) req.session.registerBody.country = country;
      return res.redirect('registration');
    }
    req.body.password = await this.hashService.hashPassword(req.body.password);
    const user = await this.userService.createOne(req.body);
    const token = await this.tokenService.generateAccessTokenForUser(user);
    this.putTokenIntoCookie(token, res);
    return res.redirect('get-user');
  }

  async login(req: Request, res: Response) {
    if (req.session.errors?.length) {
      return res.redirect('login');
    }
    const token = await this.tokenService.generateAccessTokenForUser(req.session.user!);
    this.putTokenIntoCookie(token, res);
    return res.redirect('get-user');
  }

  async getUser(req: Request, res: Response) {
    if (req.session.errors?.length) {
      return res.redirect('login');
    }
    const user = plainToClass(UserSerializer, req.session.user);
    return res.render('home', { user });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('accessToken');
    req.session.destroy(() => 0);
    return res.redirect('login');
  }

  async getLoginPage(req: Request, res: Response) {
    res.render('login', {
      errors: req.session.errors,
      body: plainToClass(UserSerializer, req.session.loginBody)
    });
    return req.session.destroy(() => 0);
  }

  async getRegistrationPage(req: Request, res: Response) {
    const countries = await this.countryService.findAll();
    res.render('registration', {
      countries,
      errors: req.session.errors,
      body: plainToClass(UserSerializer, req.session.registerBody)
    });
    return req.session.destroy(() => 0);
  }
}
