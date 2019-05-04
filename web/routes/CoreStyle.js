import { css } from 'emotion';

export const ContainerStyle = css`
  width: 80%;
  margin: auto;
  font-family: 'Arial';
`;

export const ContentStyle = css`
  margin-top: 20px;
`;

export const TriColStyle = css`
  column-count: 3;
`;

export const ButtonLinkStyle = css`
  padding: 10px;
  border: 1px solid gray;
  text-decoration: none;
  color: black;
  background-color: white;

  &:hover {
    background-color: lightblue;
  }
`;
