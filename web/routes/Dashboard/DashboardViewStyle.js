import { css } from 'emotion';

export const DashboardViewStyle = css`
  width: 80%;
  margin: auto;
  font-family: 'Arial';
`;

export const MenuStyle = css`
  border-radius: 5px;
  box-shadow: 0 3px 1px lightblue;
  padding: 12px;
  text-align: center;
  display: inline-block;
  margin-right: 5px;

  &:hover {
    background-color: lightgray;
  }

  a {
    color: black;
    text-decoration: none;
    display: block;
  }
`;

export const InputStyle = css`
  input {
    font-size: 14pt;
    padding: 10px;
    width: 100%;
  }
`;
