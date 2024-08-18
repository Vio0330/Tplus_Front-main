import styled from 'styled-components';

type IconProps = {
  src: string;
  alt?: string;
}

const Icon = styled.img.attrs<IconProps>((props) => ({
  src: `/images/icons/${props.src}` || '',
  alt: props.alt || '',
}))`
  display: block;
  width: 2rem;
  aspect-ratio: 1;
  background: transparent;
  margin-left: .2rem;
`;

export default Icon;
