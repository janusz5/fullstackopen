import express from "express";

const errorHandler = (
  error: Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
): express.Response => {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  return res.status(400).send(errorMessage);
};

export { errorHandler };
