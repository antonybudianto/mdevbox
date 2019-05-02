import { css } from 'emotion';

export const ButtonStyle = css`
  border: 1px solid gray;
  background-color: lightskyblue;
  padding: 8px;

  &:hover {
    background-color: lightblue;
  }
`;

export const AppStyle = css`
  width: 80%;
  margin: auto;
  font-family: 'Arial';
`;

export const FetchDataStyle = css`
  overflow: auto;
  height: 150px;
`;

export const TableStyle = css`
  font-family: 'Arial';
  width: 100%;
  border: 1px solid lightgray;
  border-spacing: 0;
  table-layout: fixed;

  tr:hover td {
    background-color: lightblue;
  }

  td {
    padding: 10px;
    word-break: break-all;
  }

  .label {
    border-radius: 10px;
    background-color: gray;
    color: white;
    font-weight: bold;
    text-align: center;
    padding: 5px;

    &.fetch {
      background-color: darkblue;
    }

    &.error {
      background-color: darkred;
    }

    &.warn {
      background-color: orange;
    }
  }
`;
