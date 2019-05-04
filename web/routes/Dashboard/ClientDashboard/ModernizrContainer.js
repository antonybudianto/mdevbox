import React, { Fragment } from 'react';
import { ModernizrStyle } from './ModernizrStyle';

const renderInputTypes = (k, v) => {
  const keys = Object.keys(v);
  const vals = Object.values(v);
  return keys.map((ck, i) => (
    <li className={vals[i] ? 'green' : 'orange'} key={ck}>
      {ck}
    </li>
  ));
};
const ModernizrContainer = ({ stat }) => {
  const keys = Object.keys(stat);
  const vals = Object.values(stat);

  return (
    <div className={ModernizrStyle}>
      <ul>
        {keys.map((k, i) => {
          return (
            <li className={!!vals[i] ? 'green' : 'orange'} key={k}>
              {k}
              {['input', 'inputtypes'].indexOf(k) !== -1 && (
                <ul>{renderInputTypes(k, vals[i])}</ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ModernizrContainer;
