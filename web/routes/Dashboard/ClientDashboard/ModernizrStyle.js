import { css } from 'emotion';

export const ModernizrStyle = css`
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
    }
  }
`;
