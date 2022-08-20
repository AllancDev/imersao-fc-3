import { NextApiRequest, NextApiResponse } from "next";
import { products } from "../../model";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(products)
}