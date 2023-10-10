import { StatusCodes } from "http-status-codes";

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "Something went wrong, Try Again Later";
  res.status(statusCode).json({ msg });
};

export default errorMiddleware;
