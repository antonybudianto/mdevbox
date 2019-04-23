import React from 'react';
import { css } from 'emotion';

const NotFoundViewStyle = css`
  font-family: Arial, Helvetica, sans-serif;
  margin: 20px;
  padding: 10px;
  border: 1px solid gray;
`;

const NotFoundView = () => (
  <div className={NotFoundViewStyle}>
    <h1>Page not found (404).</h1>
    <a href="/">Back to Home</a>
  </div>
);

export default NotFoundView;
