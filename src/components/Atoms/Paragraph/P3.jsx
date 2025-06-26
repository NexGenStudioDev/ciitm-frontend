import PropTypes from 'prop-types';

const P3 = ({ children, Tailwind_utility_Class }) => {
   const defaultClass =
      'text-[2vw] max-[400px]:text-[3.5vw] md:text-[1.2vw] leading-relaxed';

   return (
      <p className={Tailwind_utility_Class || defaultClass}>
         {children}
      </p>
   );
};

P3.propTypes = {
   children: PropTypes.string.isRequired,
   Tailwind_utility_Class: PropTypes.string,
};

export default P3;
