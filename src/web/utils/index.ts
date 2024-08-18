import { NextApiRequest } from 'next';

import _ from 'lodash';

import { NextApiRequestCookies } from 'next/dist/server/api-utils';

import { IncomingMessage } from 'http';

import { RootState } from '../redux/store';

import { ERROR_MESSAGE, SubscriptionStatus } from '../types';

export function get<T extends keyof RootState>(key: T) {
  return (state: RootState) => state[key];
}

export async function fetchData({
  url, options = {}, result = true,
}: {
  url: string;
  options?: RequestInit;
  result?: boolean,
}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(ERROR_MESSAGE.Unauthorized);
    }

    throw new Error(`Server Error::${response.status}`);
  }

  const method = options.method || 'GET';

  if (method === 'POST' || method === 'GET') {
    if (!result) {
      return {};
    }

    return response.json();
  }

  return {};
}

export function toCamelCase(data: Record<string, any>): any {
  if (!data) {
    return data;
  }

  const keys = Object.keys(data);

  const result = keys.reduce((acc: { [k: string]: any }, key: string) => {
    const name = _.camelCase(key);
    const value = data[key];

    return {
      ...acc,
      [name]: value,
    };
  }, {} as Record<string, any>);

  return result;
}

type Request = IncomingMessage & {
  cookies: NextApiRequestCookies
}

export function verifyToken(req: Request) {
  const { token, type, profileImage } = req.cookies;

  if (!token) {
    throw new Error('Unauthorized');
  }

  return {
    token,
    type,
    profileImage,
  };
}

export function extractBody(req: NextApiRequest) {
  const { method, query, body } = req;

  if (method === 'GET') {
    return '';
  }

  if (method === 'DELETE') {
    const { testPaperId } = query;

    if (!testPaperId) {
      return '';
    }

    return JSON.stringify({ test_paper_id: testPaperId });
  }

  return JSON.stringify(body);
}

export function isServiceAvailable({
  type,
  expiredAt,
}: {
  type: string;
  expiredAt: string;
}) {
  if (type === SubscriptionStatus.None || type === '') {
    return false;
  }

  if (type === SubscriptionStatus.Promotion || type === SubscriptionStatus.Active) {
    return true;
  }

  if (type === SubscriptionStatus.InActive) {
    const expiredDate = new Date(expiredAt);
    const now = new Date();

    if (expiredDate >= now) {
      return true;
    }

    return false;
  }

  return false;
}

export function toDate(timestamp: string) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 해줘야 합니다.
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}

export function toDateKoreanFormat(timestamp: string) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 해줘야 합니다.
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일`;
}

export function sortDates(dates: string[]) {
  return dates.sort((a, b) => {
    const x = new Date(a.replace(/년|월|일/g, '/')).getTime();
    const y = new Date(b.replace(/년|월|일/g, '/')).getTime();

    return y - x;
  });
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat().format(value);
}
