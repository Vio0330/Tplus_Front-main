export enum ERROR_MESSAGE {
  Unauthorized = 'unauthorized',
}

export enum SubscriptionStatus {
  None = '구독 정보가 없습니다.',
  Promotion = '무료 14일 체험',
  Active = '매달 9,900원 결제',
  InActive = '구독후 이용해주세요',
}

export type User = {
  loggedIn: boolean;
  profileImage: string;
  type: string;
}

export type Paper = {
  id: number;
  name: string;
  type: string;
  grade: string;
  school: string;
  downloadUri: string;
  updatedAt: string;
  status: string;
}

export type Question = {
  number: number;
  type: string;
}

export type Passage = {
  title: string;
  content?: string;
  number: number;
  questions: Question[];
}

export type PaperDetail = {
  id: number;
  name: string;
  type: string;
  grade: string;
  school: string;
  passages: Passage[];
}

export type QuestionType = {
  name: string
}[]

export type Credit = {
  school: string;
  grade: string;
  year: string;
  email: string;
}

export type CreditForm = {
  form: {
    school: string;
    grade: string;
    year: string;
    email: string;
  }
  processing: boolean;
  completion: boolean;
}

export type BillingLog = {
  id: number,
  merchandise: string,
  price: number,
  createdAt: string,
}
