import React, { PureComponent } from 'react';
import {
  DashboardViewStyle,
  MenuStyle,
  InputStyle
} from './DashboardViewStyle';

const menus = [
  {
    label: 'MiniLog',
    href: '/dashboard/log'
  },
  {
    label: 'Logout',
    href: '/logout'
  }
];

class DashboardView extends PureComponent {
  state = {
    search: ''
  };
  handleSearchChange = e => {
    this.setState({
      search: e.target.value
    });
  };
  render() {
    let nmenus = menus;
    if (this.state.search) {
      nmenus = menus.filter(
        m => m.label.toLowerCase().indexOf(this.state.search) !== -1
      );
    }

    return (
      <div className={DashboardViewStyle}>
        <h1>Welcome</h1>
        <div className={InputStyle}>
          <input
            placeholder="Search for services..."
            value={this.state.search}
            onChange={this.handleSearchChange}
          />
        </div>
        <div style={{ marginTop: '30px' }}>
          {nmenus.map((m, i) => (
            <div className={MenuStyle} key={i}>
              <a href={m.href}>{m.label}</a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default DashboardView;
