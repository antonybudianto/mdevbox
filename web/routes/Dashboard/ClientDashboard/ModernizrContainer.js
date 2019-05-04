import React from 'react';
import { ModernizrStyle } from './ModernizrStyle';

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
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ModernizrContainer;
