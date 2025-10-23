import { NotFoundError } from '@core/shared/domain/erros/not-found.error';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundError)
export class NotFoundErrorFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    response.status(404).json({
      statusCode: 404,
      error: 'Not Found',
      message: (exception as NotFoundError).message,
    });
  }
}
