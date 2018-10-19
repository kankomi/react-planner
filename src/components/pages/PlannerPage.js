import React from 'react';
import Planner from '../Planner/Planner';
import ButtonMenu from '../layout/ButtonMenu';

export default () => {
  return (
    <div className="p-2">
      <Planner startDate="2018-01-01" endDate="2018-05-31" locale="de" />
      <ButtonMenu />
    </div>
  );
};
