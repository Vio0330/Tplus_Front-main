import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  width: 27.7rem;
`;

const FieldWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 3.2rem;

  label {
    flex: 1;
  }

  input {
    height: 100%;
    border: 1px solid ${(props) => props.theme.colors.gray100}
  }

  button {
    display: block;
    margin-left: 1rem;
    padding: .6rem 1.8rem;
    border: 1px solid ${(props) => props.theme.colors.orange100};
    border-radius: .4rem;
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.orange100};
  }
`;

const List = styled.ul`
  margin-left: 5.494rem;
  margin-top: 1rem;
  max-height: 10rem;
  border: 1px solid ${(props) => props.theme.colors.gray100};
  overflow-y: scroll;
`;

type ItemProps = {
  selected: boolean;
}

const Item = styled.li<ItemProps>`
  button {
    display: block;
    width: 100%;
    padding-block: 1rem;
    color: ${(props) => (props.selected ? '#F88125' : '#000000')};
    text-align: start
  }
`;

type SchoolProps = {
  name: string;
  value: string;
  schools: {
    name: string;
    region: string;
  }[];
  clear: boolean;
  onSelectOption: ({ name, value }: {
    name: string;
    value: string;
  }) => void;
}

export default function Schools({
  name, value, schools, clear, onSelectOption,
}: SchoolProps) {
  const [searchSchool, setSearchSchool] = useState('');
  const [schoolList, setSchoolList] = useState<{
    name: string;
    region: string;
  }[]>([]);

  useEffect(() => {
    if (clear) {
      setSearchSchool('');
      setSchoolList([]);
    }
  }, [clear]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setSearchSchool(target.value);
  };

  const handleSearchButton = () => {
    if (!searchSchool) {
      return;
    }

    const searchedSchools = schools
      .filter((school) => school.name.includes(searchSchool));

    setSchoolList(searchedSchools);
  };

  const handleSelectSchool = (schoolName: string) => {
    onSelectOption({ name, value: schoolName });
  };

  return (
    <Container>
      <FieldWrapper>
        <label htmlFor="school">학교</label>
        <input
          id="school"
          type="text"
          name={name}
          value={searchSchool}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={handleSearchButton}
        >
          조회
        </button>
      </FieldWrapper>
      {schoolList.length >= 1 && (
        <List>
          {schoolList.map((school) => (
            <Item
              key={`${school.name}-${school.region}`}
              selected={value === school.name}
            >
              <button
                type="button"
                onClick={() => handleSelectSchool(school.name)}
              >
                {school.name}
                {' '}
                (
                {school.region}
                )
              </button>
            </Item>
          ))}
        </List>
      )}
    </Container>
  );
}
