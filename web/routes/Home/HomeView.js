import React, { PureComponent } from 'react';
import { ContainerStyle, ButtonLinkStyle } from '../CoreStyle';
import { FooterStyle, HomeStyle } from './HomeViewStyle';

class HomeView extends PureComponent {
  render() {
    return (
      <div className={ContainerStyle}>
        <h1>Devbox</h1>
        <h3>All-in-one Mobile Web Dev Platform</h3>
        <div className={HomeStyle}>
          <a href="/dashboard" className={ButtonLinkStyle}>
            Dashboard
          </a>
        </div>
        <footer className={FooterStyle}>&copy; 2019. Antony Budianto.</footer>
      </div>
    );
  }
}

export default HomeView;
