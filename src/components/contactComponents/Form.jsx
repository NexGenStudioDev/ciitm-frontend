const Form = () => {
  return (
    <form className='space-y-4'>
      <div className='relative'>
        <input
          type='text'
          id='name'
          className='peer w-full py-1 text-sm mt-1 border-b focus:outline-none transition ease-linear focus:border-[#333333] border-gray-300 shadow-sm'
          placeholder=''
        />
        <label
          htmlFor='name'
          className='block absolute top-[0.6rem] transition-all ease-out text-sm opacity-65 text-gray-700           peer-focus:opacity-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-[:not(:placeholder-shown)]:opacity-0 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-xs'
        >
          Name:
        </label>
      </div>

      <div className='relative'>
        <input
          type='email'
          id='email'
          placeholder=''
          className='peer w-full py-1 text-sm mt-1 border-b focus:outline-none transition ease-linear focus:border-[#333333] border-gray-300 shadow-sm'
        />
        <label
          htmlFor='email'
          className='block absolute top-[0.6rem] transition-all ease-out text-sm opacity-65 text-gray-700           peer-focus:opacity-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-[:not(:placeholder-shown)]:opacity-0 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-xs'
        >
          Email:
        </label>
      </div>

      <div className='relative'>
        <input
          type='text'
          id='phone'
          placeholder=''
          className='peer w-full py-1 text-sm mt-1 border-b focus:outline-none transition ease-linear focus:border-[#333333] border-gray-300 shadow-sm'
        />
        <label
          htmlFor='phone'
          className='block absolute top-[0.6rem] transition-all ease-out text-sm opacity-65 text-gray-700           peer-focus:opacity-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-[:not(:placeholder-shown)]:opacity-0 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-xs'
        >
          Phone Number:
        </label>
      </div>

      <div className='relative'>
        <textarea
          id='message'
          rows='4'
          placeholder=''
          className='peer resize-none w-full mt-1 border border-[#D7D7D7B2] bg-[#F9F9F9] focus:outline-[#333333] transition ease-linear text-sm p-2 rounded-md shadow-sm'
        ></textarea>
        <label
          htmlFor='message'
          className='top-2.5 left-2 peer-focus:opacity-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-[:not(:placeholder-shown)]:opacity-0 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-xs opacity-65 absolute text-sm text-gray-700 transition ease-out'
        >
          Message:
        </label>
      </div>

      <button
        type='submit'
        aria-label="Submit contact form"
        className='w-full bg-[#333333] text-white py-2 px-4 rounded-md'
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
