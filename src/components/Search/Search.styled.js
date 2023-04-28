import styled from 'styled-components';
import { BsSearchHeartFill as Icon } from 'react-icons/bs';

export const SearchBar = styled.form`
  width: 300px;
  display: grid;
`;

export const SearchInput = styled.input`
  width: 280px;
  background: #f7f7f7;
  box-shadow: 0px 4px 4px rgba(201, 200, 200, 0.25);
  border-radius: 5px;
  border: none;
  padding: 15px 0 15px 20px;
  height: 20px;
`;

export const SearchIcon = styled(Icon)`
  width: 20px;
  height: 30px;
  fill: #5f0606;
`;

export const SearchButton = styled.button`
  position: absolute;
  background: none;
  border: none;
  height: 20px;
  cursor: pointer;
  justify-self: end;
  margin-top: 10px;
  margin-right: 10px;
`;

export const ClearButton = styled.button`
  heigth: 10px;
  width: 100%;
  background: none;
  cursor: pointer;
  border: none;
  text-align: left;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Banner = styled.img`
  width: 300px;
`;
