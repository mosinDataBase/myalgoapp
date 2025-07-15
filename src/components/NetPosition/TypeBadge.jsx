import React from 'react';

const TypeBadge = ({ pos }) => {
  let label = '';
  let colorClass = '';

  if (pos.type?.includes('FUT')) {
    label = 'FUT';
    colorClass = 'bg-orange-100 text-orange-700';
  } else if (pos.optTp === 'PE') {
    label = 'PE';
    colorClass = 'bg-red-100 text-red-700';
  } else if (pos.optTp === 'CE') {
    label = 'CE';
    colorClass = 'bg-green-100 text-green-700';
  } else {
    label = pos.series || pos.prod || 'NA';
    colorClass = 'bg-gray-100 text-gray-700';
  }

  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colorClass}`}>
      {label}
    </span>
  );
};

export default TypeBadge;
