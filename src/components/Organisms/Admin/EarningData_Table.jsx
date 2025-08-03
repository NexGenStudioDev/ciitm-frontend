import React from 'react';
import TableRow_Heading from '../../Molecules/table/TableRow_Heading';

const EarningData_Table = ({ arr }) => {
   return (
      <TableRow_Heading
         TableHeadingArray={arr}
         TableRowClassName='w-full'
      />
   );
};

export default EarningData_Table;
