import React from "react";
import TableHeading from "../../Atoms/Table/Th/TableHeading";
import TableData from "../../Atoms/Table/Td/TableData";


const StudentTableHeading = ({HeadingArray = []}) => {
  return (
   
     <TableHeading  Tailwind_utility_Class="w-full px-[2.8vw] h-[7vh] bg-[#090909] text-white flex items-center justify-between px-4">

        {HeadingArray.map((heading, index) => (
          <TableData key={index} Tailwind_utility_Class="flex item-center justify-center text-center h-full w-fit  max-[348px]:text-[3.5vw] max-[553px]:text-[2.7vw] max-[775px]:text-[2vw] md:text-md">
            {heading}
          </TableData>
        ))}

     </TableHeading>

  );
}
export default StudentTableHeading;