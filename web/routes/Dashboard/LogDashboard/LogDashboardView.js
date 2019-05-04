import React, { PureComponent } from 'react';
import UAParser from 'ua-parser-js';
import cn from 'classnames';
import {
  TableStyle,
  ButtonStyle,
  AppStyle,
  FetchDataStyle
} from './LogDasboardViewStyle';

class LogDashboardView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      logs: []
    };
  }

  componentDidMount() {
    this.fetchLogs();
    this.token = setInterval(this.fetchLogs, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.token);
  }

  fetchLogs = () => {
    fetch('/api/v1/logs', { credentials: 'include' })
      .then(res => res.json())
      .then(o => {
        this.setState({
          logs: o.logs
        });
      });
  };

  deleteLogs = () => {
    fetch('/api/v1/logs', {
      method: 'DELETE'
    }).then(res => {
      if (!res.ok) {
        throw new Error('Failed to delete logs');
      }
      return res;
    });
  };

  handleClickDelete = () => {
    const ok = confirm('Are you sure?');
    if (ok) {
      this.deleteLogs();
    }
  };

  render() {
    return (
      <div className={AppStyle}>
        <h1>DevBox</h1>
        <div>
          <a href="/dashboard">Home</a> > MiniLog
        </div>
        <div style={{ marginBottom: '20px', float: 'right' }}>
          <button className={ButtonStyle} onClick={this.handleClickDelete}>
            Delete logs
          </button>
        </div>
        <table className={TableStyle}>
          <thead>
            <tr>
              <th style={{ width: '110px' }}>Date</th>
              <th style={{ width: '100px' }}>Type</th>
              <th>IP</th>
              <th>Origin</th>
              <th>Location</th>
              <th>UserAgent</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {this.state.logs.map((l, i) => {
              const ua = new UAParser(l.ua).getResult();
              return (
                <tr key={i}>
                  <td>{new Date(l.date).toLocaleString()}</td>
                  <td>
                    <div
                      className={cn('label', {
                        [l.type]: true
                      })}
                    >
                      {l.type}
                    </div>
                  </td>
                  <td>{l.ip}</td>
                  <td>{l.origin}</td>
                  <td>{l.href}</td>
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
                  <td>
                    <ul>
                      {l.messages.map((m, im) => (
                        <li key={im}>
                          {l.type === 'fetch' ? (
                            <pre className={FetchDataStyle}>
                              {JSON.stringify(JSON.parse(m), null, 2)}
                            </pre>
                          ) : (
                            m
                          )}
                        </li>
                      ))}
                    </ul>
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

export default LogDashboardView;
