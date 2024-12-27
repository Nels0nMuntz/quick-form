import { Request, Response } from "express";

export default {
  status: async (req: Request, res: Response) => {
    res.send({ success: true });
  },
};
