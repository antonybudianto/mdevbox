import React, { PureComponent } from 'react';
import UAParser from 'ua-parser-js';
import cn from 'classnames';
import {
  TableStyle,
  ButtonStyle,
  AppStyle,
  FetchDataStyle
} from './ClientDasboardViewStyle';

class ClientDashboardView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      clients: []
    };
  }

  componentDidMount() {
    this.fetchClients();
    this.token = setInterval(this.fetchClients, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.token);
  }

  fetchClients = () => {
    fetch('/api/v1/socket/clients', { credentials: 'include' })
      .then(res => res.json())
      .then(o => {
        this.setState({
          clients: o.clients
        });
      });
  };

  handleReloadAll = () => {
    const yes = confirm('All clients will be reloaded, are you sure?');
    if (yes) {
      fetch('/api/v1/socket/reload').then(() => {
        alert('All clients reloaded successfully');
      });
    }
  };

  handleSetCookie = () => {
    const cookie = prompt('Please enter the cookie value');
    if (cookie !== null) {
      fetch('/api/v1/socket/set-cookie', {
        method: 'POST',
        body: JSON.stringify({ cookie }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(() => {
        alert('All clients cookies have been set successfully');
      });
    }
  };

  render() {
    return (
      <div className={AppStyle}>
        <h1>DevBox</h1>
        <div>
          <a href="/dashboard">Home</a> > Client
        </div>
        <div style={{ marginBottom: '20px', float: 'right' }}>
          <button className={ButtonStyle} onClick={this.handleSetCookie}>
            Set cookie to all
          </button>
          <button className={ButtonStyle} onClick={this.handleReloadAll}>
            Reload all
          </button>
        </div>
        <table className={TableStyle}>
          <thead>
            <tr>
              <th>Issued</th>
              <th>ID</th>
              <th>IP Address</th>
              <th>UserAgent</th>
            </tr>
          </thead>
          <tbody>
            {this.state.clients.map((l, i) => {
              const ua = new UAParser(l.ua).getResult();
              return (
                <tr key={i}>
                  <td>{new Date(l.issued).toLocaleString()}</td>
                  <td>{l.id}</td>
                  <td>{l.ip}</td>
                  <td title={ua.ua}>
                    {ua.browser.name && (
                      <div>
                        <strong>Browser:</strong> {ua.browser.name}/
                        {ua.browser.version}
                      </div>
                    )}
                    {ua.engine.name && (
                      <div>
                        <strong>Engine:</strong> {ua.engine.name}/
                        {ua.engine.version}
                      </div>
                    )}
                    {ua.os.name && (
                      <div>
                        <strong>OS:</strong> {ua.os.name}/{ua.os.version}
                      </div>
                    )}
                    {ua.device.model && (
                      <div>
                        <strong>Device:</strong> {ua.device.model}/
                        {ua.device.type}/{ua.device.vendor}
                      </div>
                    )}
                    {ua.cpu.architecture && (
                      <div>
                        <strong>CPU:</strong> {ua.cpu.architecture}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ClientDashboardView;
