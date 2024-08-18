import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'POST') {
    res.setHeader('Set-Cookie', [
      'token=; Path=/; HttpOnly; SameSite=Strict;',
      'profileImage=; Path=/; SameSite=Strict;',
    ]);

    res.status(200).json({});
  }

  res.status(404).json({});
}
