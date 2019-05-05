import { css } from 'emotion';

export const ModernizrStyle = css`
  overflow: auto;
  height: 300px;
  box-shadow: 0 -2px 5px lightgray inset;

  ul {
    column-count: 4;
  }
  li {
    &.green {
      color: green;
    }
    &.orange {
      color: darkred;
    }

    ul {
      column-count: 2;
      border-bottom: none;
    }
  }
`;
