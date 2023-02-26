import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';

export function bodyValidator<T>(dto: ClassConstructor<T>) {
  return async (req: Request<unknown, unknown, T>, res: Response, next: NextFunction) => {
    const entityToValidate = plainToClass(dto, req.body);
    const errors = await validate(entityToValidate as object);
    if (errors.length) {
      const errorMessagesArray: string[] = [];
      errors
        .map((obj) => obj.constraints)
        .forEach((error) => {
          for (const property in error) {
            errorMessagesArray.push(error[property]);
          }
        });
      req.session.errors = errorMessagesArray;
      return next();
    }
    req.body = entityToValidate;
    return next();
  };
}
