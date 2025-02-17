import { GoArrowUpRight } from 'react-icons/go';
import { MdDelete } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAlbum from '../../hooks/useAlbum';
import { Remove_One_Album } from '../../store/Album.slice.js';
import { useDispatch, useSelector } from 'react-redux';

const Album = () => {
   const [albums, setAlbums] = useState([]);
   let dispatch = useDispatch();
   const [error, setError] = useState(false);
   let user = useSelector(state => state.auth.user);
   const [userRole, setuserRole] = useState('');
   const [Disable_Click, setDisable_Click] = useState(false);

   useAlbum();

   let album = useSelector(state => state.home.Album);

   useEffect(() => {
      {
         user && setuserRole(user.role);
      }
   }, [user]);

   useEffect(() => {
      if (album) {
         setAlbums([...album]);
      }
   }, [album]);

   let Handle_Album_Delete = album => {
      console.log('Album Deleted', album);
      console.log('PreventDefault 1 ', Disable_Click);
      setDisable_Click(_prevState => true);
      alert('Album Deleted Successfully');
      console.log('PreventDefault 2 ', Disable_Click);

      // setPreventDefault(true)
      // dispatch(Remove_One_Album(album))
   };

   let Handle_Click = e => {
      if (Disable_Click === true) {
         e.preventDefault();
      }
   };

   return (
      <div className='w-full h-auto md:h-screen px-[3vw] py-5 flex items-center justify-between flex-col md:flex-row'>
         <div className='md:w-[55vw] md:h-[62vh] w-full sm:h-full grid grid-rows-2 grid-cols-2 md:grid-cols-3 gap-[3vw] md:gap-[1.5vw] place-items-center'>
            {error ? (
               <h1 className='text-2xl text-center'>
                  No Data From Backend
               </h1>
            ) : albums.length === 0 ? (
               <h1 className='text-2xl text-center'>
                  Album Not Found
               </h1>
            ) : (
               albums.map(item => (
                  <Link
                     to={`/album/${item.aName}`}
                     onClick={e => Handle_Click(e)}
                     className='h-[40vw] w-full md:h-full rounded-lg overflow-hidden relative m-[3vw]'
                     key={item._id}
                  >
                     <div className='h-full w-full bg-zinc-500 absolute top-0 left-0 bg-cover bg-center'>
                        <img
                           src={item.aImage_url}
                           alt={item.aName}
                           className='w-full h-full object-cover object-top'
                        />
                     </div>
                     <div
                        className='flex justify-center p-1.5 items-center rounded-full max-[528px]:w-[8vw] max-[528px]:h-[8vw] md:w-[2.5vw] md:h-[2.5vw] bg-black absolute z-40 right-1 top-1 my-2 mx-2'
                        onClick={() => Handle_Album_Delete(item)}
                     >
                        {userRole === 'admin' ? (
                           <MdDelete className='text-2xl text-white' />
                        ) : (
                           <GoArrowUpRight className='text-2xl text-white' />
                        )}
                     </div>
                     <div className='absolute bottom-0 left-0 bg-black bg-opacity-20 flex justify-between h-[20%] items-center px-4 w-full z-40'>
                        <p className='text-[2vw] md:text-[1vw] text-white font-semibold'>
                           {item.aName}
                        </p>
                        <p className='text-[2.3vw] md:text-[1vw] text-white'>
                           {item.createdAt.split('T')[0]}
                        </p>
                     </div>
                  </Link>
               ))
            )}
         </div>

         <div className='bg-red-600 h-[63vh] w-full md:w-[35vw] mr-[1vw] md:mr-[2vw] rounded-lg relative'>
            {albums.length > 5 &&
               albums.slice(-1).map(item => (
                  <Link
                     to={`/album/${item.aName}`}
                     className='rounded-lg w-[80%]'
                     key={item.id}
                  >
                     <img
                        srcSet={item.aImage_url}
                        alt=''
                        className='w-full h-full object-cover rounded-lg object-top'
                     />

                     <div className='flex justify-center p-1.5 items-center rounded-full max-[528px]:w-[8vw] max-[528px]:h-[8vw] md:w-[2.5vw] md:h-[2.5vw] bg-black absolute z-40 right-1 top-1 my-2 mx-2'>
                        <GoArrowUpRight className='text-2xl text-white' />
                     </div>

                     <div className='absolute bottom-0 right-0 bg-black bg-opacity-40 flex justify-between h-[25%] items-center px-4 w-full z-40'>
                        <p className='text-lg md:text-base text-white'>
                           {item.aName}
                        </p>
                        <p className='text-lg md:text-base text-white'>
                           {item.createdAt.split('T')[0]}
                        </p>
                     </div>
                  </Link>
               ))}
         </div>
      </div>
   );
};

export default Album;
