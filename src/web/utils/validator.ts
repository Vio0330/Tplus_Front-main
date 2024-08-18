import { Passage } from '../types';

export function validatePassageContent(passage: Passage): boolean {
  if (Object.keys(passage).includes('content')) {
    return !!passage.content;
  }

  return true;
}

export function validateQuestion(passage: Passage): boolean {
  if (passage.questions.length === 0) {
    return false;
  }

  return true;
}

export function validateQuestionType(passage: Passage): boolean {
  const questionTypes = passage.questions.map(({ type }) => type);

  return questionTypes.every((type) => type !== '');
}
