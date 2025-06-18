import React from 'react';

import Contact_view from '../../Molecules/Admin/Contact/Contact_view';

const AdminInputContact_View = ({ data }) => {
   return (
      <div className='flex flex-col w-[95%]  gap-[2vh] mt-[3vh]'>
         <Contact_view data={data} />
      </div>
   );
};

export default AdminInputContact_View;
