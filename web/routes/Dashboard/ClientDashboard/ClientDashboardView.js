import React, { PureComponent } from 'react';
import UAParser from 'ua-parser-js';
import {
  TableStyle,
  ButtonStyle,
  AppStyle,
  ConStatusStyle,
  vAlignMiddle
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
    const cookie = prompt(
      'Please enter the cookie value',
      'username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC'
    );
    if (cookie) {
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

  handleRunEval = () => {
    const cmd = prompt('Please enter eval value');
    if (cmd) {
      fetch('/api/v1/socket/run-eval', {
        method: 'POST',
        body: JSON.stringify({ cmd }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Error run eval');
          }
        })
        .then(() => {
          alert('All clients ran eval successfully');
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
          <button className={ButtonStyle} onClick={this.handleRunEval}>
            Run eval all
          </button>
          <button className={ButtonStyle} onClick={this.handleSetCookie}>
            Set cookie all
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
                  <td>
                    <div className={ConStatusStyle + ' ' + vAlignMiddle} />{' '}
                    <span className={vAlignMiddle}>
                      {new Date(l.issued).toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <a href={'/dashboard/client/' + l.id}>{l.id}</a>
                  </td>
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
