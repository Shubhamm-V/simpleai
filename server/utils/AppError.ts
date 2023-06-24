// Used to Send error message if some error occurs
class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode * 1;
    this.status = `${
      statusCode.toString().startsWith('4') ? 'fail' : 'success'
    }`;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
