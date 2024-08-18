import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { Passage } from '../../types';

import WhiteButton from '../ui/WhiteButton';
import OrangeButton from '../ui/OrangeButton';

const ControlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3.2rem;
  align-items: center;
`;

const Label = styled.label`
  display: none;
`;

const PassageTitleField = styled.input`
  font-size: 2.4rem;
  font-weight: 500;
  letter-spacing: -0.96px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  column-gap: .8rem;

  button {
    width: 11.9rem;
    height: 3.2rem;
    white-space: nowrap;
  }
`;

const Script = styled.div`
  width: 100%;
  height: 37.1rem;
  background: ${(props) => props.theme.colors.gray50};
  border-radius: .4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: -0.32px;
  margin-top: 1.6rem;
`;

const ContentField = styled.textarea`
  width: 100%;
  height: 37.1rem;
  background: ${(props) => props.theme.colors.gray50};
  border-radius: .4rem;
  display: block;
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: -0.32px;
  margin-top: 1.6rem;
  outline: none;
  border: none;
  resize: none;
  padding: 1.6rem;
`;

type PassageEditorProps = {
  selectedPassage: Passage;
  onChangeTitle: ({ number, title }: {
    number: number;
    title: string;
  }) => void;
  onChangeContent: ({ number, content }: {
    number: number;
    content: string;
  }) => void;
  onClearPassageContent: ({ number }: { number: number }) => void;
}

export default function PassageEditor({
  selectedPassage,
  onChangeTitle, onChangeContent, onClearPassageContent,
}: PassageEditorProps) {
  const [isEditable, setEditable] = useState(false);

  const { number, title, content } = selectedPassage;

  useEffect(() => {
    if (Object.keys(selectedPassage).includes('content')) {
      setEditable(true);
      return;
    }

    setEditable(false);
  }, [selectedPassage.number]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event;

    const { name, value } = target;

    if (name === 'title') {
      onChangeTitle({
        number,
        title: value,
      });
      return;
    }

    if (name === 'content') {
      onChangeContent({
        number,
        content: value,
      });
    }
  };

  const handleClickEditMode = (editable: boolean) => {
    setEditable(editable);

    if (editable) {
      onChangeContent({ number, content: '' });
    }

    if (!editable) {
      onClearPassageContent({
        number: selectedPassage.number,
      });
    }
  };

  return (
    <>
      <ControlWrapper>
        <Label htmlFor="passage-title">
          지문 제목
        </Label>
        <PassageTitleField
          id="passage-title"
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
        {isEditable ? (
          <ButtonWrapper>
            <OrangeButton
              type="button"
              onClick={() => handleClickEditMode(true)}
            >
              본문 직접 입력
            </OrangeButton>
            <WhiteButton
              type="button"
              onClick={() => handleClickEditMode(false)}
            >
              본문 자동 생성
            </WhiteButton>
          </ButtonWrapper>
        ) : (
          <ButtonWrapper>
            <WhiteButton
              type="button"
              onClick={() => handleClickEditMode(true)}
            >
              본문 직접 입력
            </WhiteButton>
            <OrangeButton
              type="button"
              onClick={() => handleClickEditMode(false)}
            >
              본문 자동 생성
            </OrangeButton>
          </ButtonWrapper>
        ) }
      </ControlWrapper>
      {isEditable ? (
        <>
          <Label htmlFor="passage-content">
            지문 내용
          </Label>
          <ContentField
            id="passage-content"
            name="content"
            value={content}
            onChange={handleChange}
            placeholder="본문을 직접 입력해주세요."
          />
        </>
      ) : (
        <Script>
          문제지 생성 시 AI로 본문이 함께 생성됩니다.
        </Script>
      )}
    </>
  );
}
