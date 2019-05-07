import React, { PureComponent } from 'react';
import UAParser from 'ua-parser-js';
import Highlight from 'react-highlight';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
  ContainerStyle,
  ContentStyle,
  TriColStyle,
  CodeStyle,
  ButtonLinkStyle
} from '../../CoreStyle';
import ModernizrContainer from './ModernizrContainer';

class ClientView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      client: null,
      dom: '',
      domStatus: ''
    };
  }
  componentDidMount() {
    this.fetchDom();
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
  handleRefreshDom = () => {
    this.setState({ domStatus: 'Loading...' });
    this.postDom()
      .then(() => {
        return new Promise((res, rej) => {
          setTimeout(() => {
            this.fetchDom()
              .then(() => {
                res();
              })
              .catch(() => {
                rej();
              });
          }, 2000);
        });
      })
      .then(() => {
        this.setState({
          domStatus: 'Success'
        });
      })
      .catch(() => {
        this.setState({
          domStatus: 'Failed fetch dom'
        });
      });
  };
  postDom = () => {
    const { match } = this.props;
    const id = match.params.id;
    return fetch('/api/v1/socket/client/' + id + '/dom', {
      method: 'POST'
    }).then(res => {
      if (!res.ok) {
        throw new Error('Error post dom');
      }
      return res;
    });
  };
  fetchDom = () => {
    const { match } = this.props;
    const id = match.params.id;
    return fetch('/api/v1/socket/client/' + id + '/dom')
      .then(res => {
        if (!res.ok) {
          throw new Error('Error fetch dom');
        }
        return res.json();
      })
      .then(json => {
        this.setState({
          dom: json.dom
        });
      });
  };
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
              <div className={TriColStyle}>
                <div>
                  <strong>IP:</strong> {client.ip}
                </div>
                <div>
                  <strong>Issued:</strong>{' '}
                  {new Date(client.issued).toLocaleString()}
                </div>
                <div>
                  <div>
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
            </div>
            <div className={ContentStyle}>
              <h2>Cookie</h2>
              <div className={CodeStyle}>{client.cookie}</div>
            </div>
            <div className={ContentStyle}>
              <h2>DOM</h2>
              <Highlight className="html">{this.state.dom}</Highlight>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  className={ButtonLinkStyle}
                  type="button"
                  onClick={this.handleRefreshDom}
                >
                  Refresh
                </button>
                <CopyToClipboard text={this.state.dom}>
                  <button className={ButtonLinkStyle}>Copy to clip</button>
                </CopyToClipboard>
                <div style={{ marginLeft: '10px' }}>{this.state.domStatus}</div>
              </div>
            </div>
            <div className={ContentStyle} style={{ marginBottom: '100px' }}>
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
