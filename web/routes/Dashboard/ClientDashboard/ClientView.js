import React, { PureComponent } from 'react';
import UAParser from 'ua-parser-js';

import { ContainerStyle, ContentStyle } from '../../CoreStyle';
import ModernizrContainer from './ModernizrContainer';

class ClientView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      client: null
    };
  }
  componentDidMount() {
    const { match } = this.props;
    const id = match.params.id;

    fetch('/api/v1/socket/client/' + id)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then(json => {
        this.setState({
          client: json
        });
      });
  }
  render() {
    const { match } = this.props;
    const { client } = this.state;
    let ua = null;
    if (client) {
      ua = new UAParser(client.ua).getResult();
    }
    return (
      <div className={ContainerStyle}>
        <h1>DevBox</h1>
        <div>
          <a href="/dashboard">Home</a> > <a href="/dashboard/client">Client</a>{' '}
          > {match.params.id}
        </div>
        {client && (
          <div className={ContentStyle}>
            <div>
              <h2>Info</h2>
              <div>IP: {client.ip}</div>
              <div>Issued: {new Date(client.issued).toLocaleString()}</div>
              <div>
                <div>UserAgent:</div>
                <div style={{ marginLeft: '10px', marginTop: '5px' }}>
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
                </div>
              </div>
            </div>
            <div>
              <h2>Modernizr</h2>
              <div>
                <ModernizrContainer stat={client.modernizr} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ClientView;
