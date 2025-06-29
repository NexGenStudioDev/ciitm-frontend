import PropTypes from 'prop-types';

const P2 = ({ children, Tailwind_utility_Class }) => {
   const defaultClass =
      'text-[3.5vw] max-[400px]:text-[4vw] md:text-[1.4vw] leading-relaxed';

   return (
      <p className={Tailwind_utility_Class || defaultClass}>
         {children}
      </p>
   );
};

P2.propTypes = {
   children: PropTypes.string.isRequired,
   Tailwind_utility_Class: PropTypes.string,
};

export default P2;
