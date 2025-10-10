import React, { useRef } from 'react';

export default function ImageUploadPreview({
   fileRef,
   imagePreview,
   onImageChange,
   errors,
}) {
   // let imageRef = useRef(); removed imageRef instead uses the parent's fileRef being passed through prop so that it is directly bound to the childs <input>

   return (
      <div className='flex flex-col items-center mb-6 w-full'>
         <div
            onClick={() => {
               fileRef.current.click();
            }}
            className='w-[10vw] h-[10vw] rounded-full overflow-hidden border-4 border-blue-600 mb-3 shadow-md'
         >
            <img
               src={imagePreview}
               alt='Profile Preview'
               className='w-full h-full object-cover'
            />
         </div>
         <label className='text-white mb-2 font-semibold'>
            Upload Profile Image
         </label>
         <input
            type='file'
            ref={fileRef}
            accept='image/*'
            onChange={onImageChange}
            className='w-full p-2 bg-[#1F1F1F] text-white rounded border border-gray-700 hidden'
         />
         {errors?.image && (
            <p className='text-red-500 text-sm mt-1'>
               {errors.image.message}
            </p>
         )}
      </div>
   );
}
