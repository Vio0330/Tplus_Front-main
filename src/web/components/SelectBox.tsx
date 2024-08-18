import {
  HTMLAttributes, useEffect, useRef, useState,
} from 'react';

import styled, { css } from 'styled-components';

import Icon from './ui/Icon';

const Container = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.96rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

type LabelProps = {
  required: boolean;
}

const Label = styled.p<LabelProps>`
  font-size: 1.2rem;
  position: relative;
  display: inline-block;
  color: ${(props) => props.theme.colors.gray400};

  &::before {
    font-size: 1.8rem;
    font-weight: 200;
    line-height: .5rem;
    position: absolute;
    top: 60%;
    right: -.9rem;
    display: ${(props) => (props.required ? 'block' : 'none')};
    content: "*";
    color: #D84010;
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

type DisplayOptionProps = {
  hasValue: boolean;
}

const DisplayOption = styled.div<DisplayOptionProps>`
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: -.064rem;
  height: 3.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .6rem .8rem .6rem 1.6rem;
  width: 100%;
  border: .1rem solid ${(props) => props.theme.colors.gray100};
  border-radius: .4rem;
  color: ${(props) => (props.hasValue ? props.theme.colors.gray800 : props.theme.colors.gray400)};
  background: #FFFFFF;
  cursor: pointer;
  line-height: 1em;
`;

type OptionsProps = {
  show: boolean;
  reverse: boolean;
};

const Options = styled.ul<OptionsProps>`
  z-index: 97;
  position: absolute;
  left: 0;
  display: ${(props) => (props.show ? 'block' : 'none')};
  margin-bottom: 7rem;
  padding: .4rem;
  width: 100%;
  min-width: max-content;
  max-height: 22rem;
  border: .1rem solid ${(props) => props.theme.colors.gray100};
  border-radius: .4rem;
  background: #FFFFFF;
  overflow: scroll;
  transition: 1s;
  ${(props) => (props.reverse
    ? css`
            bottom: -2.6rem;
          `
    : css`
            top: calc(3.2rem + .6rem);
          `)};
`;

const Option = styled.li`
  display: flex;
  align-items: center;
  padding: calc(1rem - .4rem);
  width: 100%;
  height: 4rem;
  border-radius: .4rem;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: .4rem;
  }

  &:hover {
    background: #EDF2FF;
    color: ${(props) => props.theme.colors.orange100};
  }
`;

const DropdownIcon = styled(Icon)`
  width: 1.6rem;
  transition: 1s;
`;

type SelectFieldProps = HTMLAttributes<Element> & {
  name: string;
  label?: string;
  value?: string;
  options: string[];
  required?: boolean;
  onSelectOption: ({ name, value }: {
    name: string; value: string;
  }) => void,
};

export default function SelectBox({
  name,
  label = '',
  value = '',
  options,
  required,
  onSelectOption,
  className,
}: SelectFieldProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const id = `select-${name}`;

  const [isShowOptions, showOptions] = useState(false);

  const handleSelect = (option: string) => {
    onSelectOption({ name, value: option });
  };

  const icon = isShowOptions ? 'up' : 'down';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        showOptions(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Container
      ref={ref}
      className={className}
      onClick={() => showOptions(!isShowOptions)}
    >
      <Label required={required || false}>
        {label || ''}
      </Label>
      <Wrapper>
        <DisplayOption hasValue={!!value}>
          {value
            ? `${value}`
            : '선택'}
          <DropdownIcon src={`arrow-${icon}.svg`} />
        </DisplayOption>
        <Options
          show={isShowOptions}
          reverse={false}
        >
          {options.map((option) => (
            <Option
              key={id + option}
              onClick={() => handleSelect(option.toString())}
            >
              {option}
            </Option>
          ))}
        </Options>
      </Wrapper>
    </Container>
  );
}
