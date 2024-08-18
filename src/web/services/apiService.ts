import axios from 'axios';

import { PaperDetail, Passage } from '../types';

const PROXY_URL = process.env.NEXT_PUBLIC_PROXY_URL;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function postCredit({ form }: {
  form: {
    school: string;
    grade: string;
    year: string;
    email: string;
  }
}) {
  const url = `${PROXY_URL}`;

  await axios.post(url, {
    form,
  });
}

export async function postTestPaper({
  name, type, grade, school,
}: {
  name: string;
  type: string;
  grade: string;
  school?: string;
}) {
  const url = `${PROXY_URL}/test-paper`;

  const payload = {
    name,
    type,
    grade,
    ...(school && { school }),
  };

  const result = await axios.post(url, payload);

  const newTestPaperId = result.data.new_test_paper_id;

  return newTestPaperId;
}

export async function requestCopyPaper(id: number) {
  const url = `${PROXY_URL}/test-paper/copy?test_paper_id=${id}`;

  const { data } = await axios.get(url);

  return data.new_test_paper_id;
}

export async function deletePaper(id: number) {
  const url = `${PROXY_URL}/test-paper?testPaperId=${id}`;

  const result = await axios.delete(url);

  if (result.status !== 200) {
    return false;
  }

  return true;
}

export async function savePaper({ paper }: {
  paper: PaperDetail;
}) {
  const url = `${PROXY_URL}/test-paper`;

  const school = paper.school || '';
  const payload = {
    id: paper.id,
    name: paper.name,
    type: paper.type,
    grade: paper.grade,
    passages: paper.passages,
    ...(school && { school }),
  };

  const response = await axios.patch(url, payload);

  if (response.status !== 200) {
    throw new Error('서버 에러 발생');
  }
}

export async function generatePaper({ id, passages }: {
  id: number,
  passages: Passage[],
}) {
  const url = `${PROXY_URL}/test-paper/gen`;

  const response = await axios.post(url, {
    id, passages,
  });

  if (response.status !== 200) {
    throw new Error('서버 에러 발생');
  }
}

export async function postCreditCard({ receiptId }: {
  receiptId: string;
}) {
  const url = `${PROXY_URL}/billing/lookup`;

  const response = await axios.post(url, {
    receipt_id: receiptId,
  });

  if (response.status !== 200) {
    throw new Error('서버 에러 발생');
  }
}

export async function requestSubscription({
  code,
}: {
  code: number;
}) {
  const url = `${PROXY_URL}/billing/subscribe`;

  const response = await axios.post(url, {
    merchandise_code: code,
  });

  if (response.status !== 200) {
    throw new Error('서버 에러 발생');
  }
}

export async function requestUnsubscription() {
  const url = `${PROXY_URL}/billing/unsubscribe`;

  const response = await axios.get(url);

  if (response.status !== 200) {
    throw new Error('서버 에러 발생');
  }
}

export async function logout() {
  const url = `${BASE_URL}/api/logout`;

  await axios.post(url);
}
