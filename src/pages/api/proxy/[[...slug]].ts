import type { NextApiRequest, NextApiResponse } from 'next';

import { extractBody, fetchData, verifyToken } from '../../../web/utils';
import log from '../../../web/utils/log';

const ignoreResultPath = [
  'billing/lookup',
  'billing/subscribe',
  'billing/unsubscribe',
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = verifyToken(req);

  if (!token) {
    return res.status(401).json({});
  }

  const { method } = req;

  const { slug, ...params } = req.query;

  const queryString = Object.entries(params).reduce((acc, cur, index) => {
    const [k, v] = cur;
    if (index === 0) {
      return `${k}=${v}`;
    }

    return `&${k}=${v}`;
  }, '');

  const path = (slug as string[] || []).join('/');

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${API_BASE_URL}/${path}?${queryString}`;

  const body = extractBody(req);

  try {
    const options = {
      method,
      headers: {
        Authorization: token,
      },
      ...(body && { body }),
    };

    const result = await fetchData({
      url,
      options,
      result: !ignoreResultPath.includes(path),
    });

    return res.status(200).json({ ...result });
  } catch (error) {
    log(`/api/proxy/${path}?${queryString}::`, error);
    return res.status(400).json({});
  }
}
