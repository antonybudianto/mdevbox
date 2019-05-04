import React, { PureComponent } from 'react';
import { ContainerStyle, ContentStyle } from '../../CoreStyle';

class ClientView extends PureComponent {
  render() {
    const { match } = this.props;
    return (
      <div className={ContainerStyle}>
        <h1>DevBox</h1>
        <div>
          <a href="/dashboard">Home</a> > <a href="/dashboard/client">Client</a>{' '}
          > {match.params.id}
        </div>
        <div className={ContentStyle}>a</div>
      </div>
    );
  }
}

export default ClientView;
