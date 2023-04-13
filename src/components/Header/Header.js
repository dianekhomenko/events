import { Container } from 'components/Header/Header.styled.js'
import { Button } from 'components/Header/Header.styled.js';
import { IoMdAddCircleOutline } from 'react-icons/io'
import img from 'logo.png'

export const Header = props => {
  return (
    <Container>
      <a href="/">
        <img src={img} alt="best idea" height="80" width="210" />
      </a>
      <Button>
        <IoMdAddCircleOutline />
        Add idea
      </Button>
    </Container>
  );
};
