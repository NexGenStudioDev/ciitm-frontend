import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
   addInput,
   setInputValueByName,
} from '../../../store/InputSlice';

const Input_Primary = ({
   type = 'text',
   placeholder = '',
   value = '',
   readOnly = false,
   className = '',
   name,
   onInput,
}) => {
   const dispatch = useDispatch();
   const inputs = useSelector(state => state.Input.inputs);

   useEffect(() => {
      if (!readOnly && name) {
         const exists = inputs.some(input => input.name === name);
         if (!exists) {
            dispatch(
               addInput({
                  type,
                  label: placeholder,
                  name,
                  value,
                  readOnly,
               }),
            );
         }
      }
   }, [dispatch, inputs, name, type, placeholder, value, readOnly]);

   const handleChange = e => {
      if (!readOnly && name) {
         dispatch(
            setInputValueByName({ name, value: e.target.value }),
         );
      }
   };

   // If readOnly, always show the passed value prop.
   // Otherwise, use Redux state if available, else fallback to value prop.
   let valueToDisplay = value;
   if (!readOnly && name) {
      const currentInput = inputs.find(input => input.name === name);
      valueToDisplay = currentInput ? currentInput.value : value;
   }

   return (
      <input
         type={type}
         readOnly={readOnly}
         placeholder={placeholder}
         onInput={onInput}
         value={valueToDisplay}
         onChange={readOnly ? undefined : handleChange}
         className={className}
         name={name}
      />
   );
};

Input_Primary.propTypes = {
   type: PropTypes.string,
   placeholder: PropTypes.string,
   value: PropTypes.string,
   readOnly: PropTypes.bool,
   className: PropTypes.string,
   name: PropTypes.string.isRequired,
   onInput: PropTypes.func,
};

export default Input_Primary;
