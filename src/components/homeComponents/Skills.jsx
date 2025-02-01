import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Skills() {
  const [goals, setGoals] = useState(null); // Use null to better indicate that the data is loading
  const [error, setError] = useState(false);
  const data = useSelector(state => state.home.landingPage);

  useEffect(() => {
    if (!data || !data.Mission_and_Goals) {
      setError(true);
    } else {
      setGoals(data.Mission_and_Goals);
      setError(false);
    }
  }, [data]);

  if (error) {
    return (
      <div className="skills-error flex items-center justify-center bg-[#333] py-[8vh]">
        <h1 className="text-red-500 font-bold text-2xl">Data Not Loaded</h1>
      </div>
    );
  }

  return (
    <div className='skills-container flex flex-wrap md:flex-nowrap bg-[#333] py-[8vh] md:py-[6vh] px-[2.8vw] md:px-[1.2vw] max-[528px]:gap-[2.5vh] gap-10 items-center justify-center'>
      {goals && goals.length > 0 ? (
        goals.map(item => (
          <div
            className='goal-card rounded-lg flex flex-col justify-center py-[2vw] md:py-[0.8vh] px-[2.8vw] md:px-[0.8vw] bg-white max-[350px]:w-[80%] max-[528px]:w-auto h-auto sm:w-[40vw] md:w-[15vw]'
            key={item._id}
          >
            <div className='image w-[5vw] max-[528px]:h-auto max-[528px]:w-[28%] md:w-[2.5vw]'>
              <img
                src={item.image}
                alt={item.title}
                className='object-cover w-full h-full rounded-full'
              />
            </div>
            <h1 className='goal-title my-2 text-[2vw] max-[528px]:text-[3.5vw] md:text-[1.1vw] font-["Montserrat"]'>
              {item.title}
            </h1>
            <p className='goal-content text-gray-500 text-[2vw] max-[528px]:text-[2.5vw] md:text-[0.8vw]'>
              {item.content}
            </p>
          </div>
        ))
      ) : (
        <div className="no-goals flex items-center justify-center text-white bg-[#333] py-12">
          <p className="text-xl">No goals available at the moment.</p>
        </div>
      )}
    </div>
  );
}

export default Skills;
