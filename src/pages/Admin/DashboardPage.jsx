
import AdminTemplate from '../../components/Templates/Admin/AdminTemplate';

import QuickLinkSection from '../../components/Organisms/Admin/QuickLinkSection';
import DashboardCardSection from '../../components/Molecules/Admin/Dashboard/DashboardCardSection';

const cards = [
   {
      title: 'Total Earnings',
      value: '₹ 2,00,000',
      image: 'https://www.pngmart.com/files/7/Earnings-PNG-Photos.png',
   },
   {
      title: 'Total Students',
      value: '1000',
      image: 'https://cdn4.iconfinder.com/data/icons/people-40/48/student_female-1024.png',
   },
   {
      title: 'Total Contacts',
      value: '100',
      image: 'https://icon-library.com/images/contact-app-icon/contact-app-icon-12.jpg',
   },
   {
      title: 'Total Images',
      value: '110',
      image: 'http://icons.iconarchive.com/icons/designbolts/free-multimedia/1024/Photo-icon.png',
   },
];

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
   return (
      <AdminTemplate pageName={'Dashboard'}>
         <DashboardCardSection cards={cards} />

         <QuickLinkSection links={QuickLinkData} />
      </AdminTemplate>
   );
};

export default DashboardPage;
