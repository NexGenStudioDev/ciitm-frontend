import { memo } from 'react';
import PropTypes from 'prop-types';
import QuickLink from '../../Atoms/Links/QuickLink';
import H1 from '../../Atoms/Heading/H1';
import H3 from '../../Atoms/Heading/H3';

const QuickLinkSection = ({ links }) => {
   return (
      <div className='Quick_Link_Container flex gap-[2vw] w-full flex-col flex-wrap mb-[4vh] p-[3vw] mt-[8vh] '>
         <H3 className='text-white max-[640px]:text-[3vw] max-[992px]:text-[2.5vw]  md:text-[1.2vw] font-bold'>
            Quick Links
         </H3>
         <div className='link_container flex gap-[2vw] max-[600px]:flex-col'>
            {links.map((link, index) => (
               <QuickLink
                  key={index}
                  path={link.path}
                  text={link.text}
               />
            ))}
         </div>
      </div>
   );
};

QuickLinkSection.propTypes = {
   links: PropTypes.arrayOf(
      PropTypes.shape({
         path: PropTypes.string.isRequired,
         text: PropTypes.string.isRequired,
      }),
   ).isRequired,
};

export default memo(QuickLinkSection);
