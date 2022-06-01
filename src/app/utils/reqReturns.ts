import { Response } from "express"

export const returnError = (
  res: Response,
  code: number,
  error: string | boolean
) => {
  res.status(code).json({ success: false, error })
}
