import React from 'react';
import {
   FaArrowAltCircleLeft,
   FaArrowAltCircleRight,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
   increaseLimit,
   increaseParPage,
   decreaseParPage,
} from '../../../../store/NavigatorSlice';

const FormTemplate = ({ children, Navigator = true, PageName }) => {
   let dispatch = useDispatch();

   const navigator = useSelector(state => state.Navigator.navigator);

   let findNavigator = navigator.find(
      item => item.pageName === PageName,
   );

   return (
      <div className='max-[553px]:shadow-lg max-[553px]:shadow-blue-700  w-[94%] max-[553px]:w-[87%] h-[90%] flex flex-col items-center  bg-[#1C1C1C] justify-between rounded-bl-2xl rounded-br-2xl mb-[18vh]'>
         <table className='w-full h-auto bg-[#1C1C1C]  table-fixed '>
            {children}
         </table>
         {Navigator && (
            <div className='w-full h-[8vh] bg-[#090909] rounded-bl-2xl rounded-br-2xl text-white flex items-center gap-[1.5vw] justify-end text-[1.5vw]'>
               <FaArrowAltCircleLeft
                  onClick={() => {
                     dispatch(
                        decreaseParPage({
                           pageName: findNavigator.pageName,
                           parPage: findNavigator.parPage,
                           limit: findNavigator.limit,
                        }),
                     );
                  }}
               />
               <FaArrowAltCircleRight
                  className='mr-[2vw]'
                  onClick={() => {
                     dispatch(
                        increaseParPage({
                           pageName: findNavigator.pageName,
                           parPage: findNavigator.parPage,
                           limit: findNavigator.limit,
                        }),
                     );
                  }}
               />
            </div>
         )}
      </div>
   );
};

export default FormTemplate;
