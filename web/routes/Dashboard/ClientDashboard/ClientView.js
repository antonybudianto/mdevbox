import React, { PureComponent } from 'react';
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
          return res.json;
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
    return (
      <div className={ContainerStyle}>
        <h1>DevBox</h1>
        <div>
          <a href="/dashboard">Home</a> > <a href="/dashboard/client">Client</a>{' '}
          > {match.params.id}
        </div>
        <div className={ContentStyle}>
          <div>
            <h2>Modernizr</h2>
            {this.state.client && (
              <div>
                <ModernizrContainer />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ClientView;
