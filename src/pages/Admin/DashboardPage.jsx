import React, { useEffect, useState } from 'react';
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';

import QuickLinkSection from '../../components/Organisms/Admin/QuickLinkSection';
import DashboardCardSection from '../../components/Molecules/Admin/Dashboard/DashboardCardSection';
import socket from '../../config/socket.mjs';
import { Helmet } from 'react-helmet-async';

let QuickLinkData = [
   {
      path: '/admin/DashBoard',
      text: 'Dashboard',
   },
   {
      path: '/admin/Contact',
      text: 'Contact',
   },
];

const DashboardPage = () => {
   const [Cards, setCard] = useState();

   useEffect(() => {
      const handleDashboardData = data => {
         console.log('data from server DashBoard_Data', data);
         setCard(data?.DashBoard_Data || []);
      };

      // Connect socket if needed
      if (!socket.connected) {
         socket.connect();
      }

      // Attach listener BEFORE emitting request
      socket.once('DashBoard_Data', handleDashboardData);

      // Emit request after listener is attached
      socket.emit('Request_DashBoard_Data');

      // Clean up
      return () => {
         socket.off('DashBoard_Data', handleDashboardData);
      };
   }, []);

   return (
      <>
         <Helmet>
            <title>Admin DashBoard</title>
            <meta
               name='description'
               content="CIITM Admin Dashboard - Manage your institution's data efficiently."
            />
         </Helmet>

         <AdminTemplate pageName={'Dashboard'}>
            <DashboardCardSection Cards={Cards} />

            <QuickLinkSection links={QuickLinkData} />
         </AdminTemplate>
      </>
   );
};

export default DashboardPage;
