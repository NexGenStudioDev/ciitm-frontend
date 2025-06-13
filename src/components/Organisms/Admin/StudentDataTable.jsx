import React from "react";
import TableRow from "../../Atoms/Table/Tr/TableRow";
import TableData from "../../Atoms/Table/Td/TableData";
import TableHeading from "../../Atoms/Table/Th/TableHeading";
import StudentTableHeading from "./StudentTableHeading";
import StudentTableData from "./StudentTableData";



let HeadingArray = [
  "S.no",
  "Name",
  "Mobile No",
  "Actions"
];

const StudentDataTable = ({ students = [] }) => {
  return (
    <div className="overflow-x-auto">


         <StudentTableHeading HeadingArray={HeadingArray} />
          <StudentTableData  />
        

    
    </div>
  );
};

export default StudentDataTable;