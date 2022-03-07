import React from 'react';

const Rank = ({ numberOfEntries, name }) => {
  return (
    <div>
      <div className="f3 white ">{name} your current number of entries is </div>

      <div className="f1 white ">{numberOfEntries}</div>
    </div>
  );
};

export default Rank;
