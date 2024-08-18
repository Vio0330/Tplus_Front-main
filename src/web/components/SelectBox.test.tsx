import { fireEvent, screen } from '@testing-library/react';

import { render } from '../utils/test-helpers';

import SelectBox from './SelectBox';

const context = describe;

describe('SelectBox', () => {
  const handleClick = jest.fn();

  const options = ['내신', '수능', '기본'];

  it('renders select box', () => {
    render((
      <SelectBox
        name="paperType"
        label="시험지 분류"
        value=""
        options={options}
        onSelectOption={handleClick}
      />
    ));

    options.forEach((option) => {
      screen.getByText(option);
    });
  });

  it('listens for click events ', () => {
    render((
      <SelectBox
        name="paperType"
        label=""
        value=""
        options={options}
        onSelectOption={handleClick}
      />
    ));

    options.forEach((option) => {
      fireEvent.click(screen.getByText(option));

      expect(handleClick).toBeCalled();
    });
  });

  context('with label', () => {
    it('renders label ', () => {
      const label = '시험지 분류';

      render((
        <SelectBox
          name="paperType"
          label={label}
          value=""
          options={options}
          onSelectOption={handleClick}
        />
      ));

      screen.getByText(label);
    });
  });

  context('without label', () => {
    it('doen\'t render label ', () => {
      const label = '시험지 분류';

      render((
        <SelectBox
          name="manufacturer"
          options={options}
          onSelectOption={handleClick}
        />
      ));

      expect(screen.queryByText(label)).toBeNull();
    });
  });
});
