import React from 'react';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';
import { useNavigate, useParams } from 'react-router-dom';
import FormTemplate_Secondary from '../../components/Templates/Admin/form/FormTemplate_Secondary';
import { useSelector } from 'react-redux';
import AdminInputContact_View from '../../components/Organisms/Admin/AdminInputContact_View';

const ViewContactPage = () => {
   let navigate = useNavigate();

   const contactDataFromRedux = useSelector(
      state => state.AdminUi.Contact,
   );

   let parms = useParams();
   let id = parms.contactId;

   if (contactDataFromRedux.length <= 0) {
      navigate('/admin/contact');
   }

   let find_Index = contactDataFromRedux.findIndex(
      item => item._id === id,
   );

   if (find_Index < 0) {
      navigate('/admin/contact');
   }

   let data = contactDataFromRedux[find_Index];

   console.log('data 123456', data);

   return (
      <AdminTemplate pageName='Contact View'>
         <FormTemplate_Secondary
            Title='View Contact'
            
            TitleClassName='text-white max-[300px]:text-[4vw] max-[500px]:text-[2.8vw] max-[995px]:text-[2vw] text-[1.3vw] bg-[#252323] w-full h-[7vh] text-[#C7C0C0]'
         >
            <AdminInputContact_View data={data} />
         </FormTemplate_Secondary>
      </AdminTemplate>
   );
};

export default ViewContactPage;
