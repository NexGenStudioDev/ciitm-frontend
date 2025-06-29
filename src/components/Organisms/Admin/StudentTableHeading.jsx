import React from 'react';
import TableRow_Heading from '../../Molecules/table/TableRow_Heading';
import PropTypes from 'prop-types';

const StudentTableHeading = ({ TableHeadingArray = [] }) => {
   return <TableRow_Heading TableHeadingArray={TableHeadingArray} />;
};

StudentTableHeading.propTypes = {
   TableHeadingArray: PropTypes.arrayOf(
      PropTypes.shape({
         text: PropTypes.string.isRequired,
         style: PropTypes.string.isRequired,
      })
   ),
};

export default StudentTableHeading;
