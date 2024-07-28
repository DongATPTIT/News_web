import { NextFunction, Request, Response } from "express";

export default async function changeBodyPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { published, categoryId, ...post } = req.body;
  req.body = {
    ...post,
    published: published == "on" ? true : false,
    categoryId: parseInt(categoryId)
  };
  next()
}
