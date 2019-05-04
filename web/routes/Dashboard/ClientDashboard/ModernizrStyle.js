import { css } from 'emotion';

export const ModernizrStyle = css`
  ul {
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
  }
  li {
    &.green {
      color: green;
    }
    &.orange {
      color: darkred;
    }
  }
`;
