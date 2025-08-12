import React, { useEffect, useState } from 'react'
import StudentTemplate from '../../components/Templates/Admin/StudentTemplate'
import { IoIosAddCircle } from "react-icons/io";
import Left_Polygon from '../../assets/images/Polygon.png';
import { IoSend } from "react-icons/io5";
import { FaRobot } from 'react-icons/fa6';
import socket from '../../config/socket.mjs';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentGroup = () => {
  const [isAi, setIsAi] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit('userJoinedChat', { studentId: user._id, username: user.name });

    socket.on('userJoinedNotification', (data) => {
      toast.info(`${data.username} joined the group!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
      toast.error('An error occurred with the chat connection.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });

    // Request and listen for recent messages
    socket.emit('requestRecentMessages');
    socket.on('recentMessages', (msgs) => {
      console.log('Recent messages:', msgs);
      setMessages(msgs || []);
    });

    // Listen for new incoming messages
    socket.on('newMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('userJoinedNotification');
      socket.off('error');
      socket.off('recentMessages');
      socket.off('newMessage');
    };
  }, [user._id, user.name]);

  const handleSendMessage = () => {
 
    socket.emit('newMessage', {
      studentId: user._id,
      username: user.name,
      content: inputValue,
      avatar: user.profile_image,
      token: user.token
    });

    socket.on('messageReceived', (msg) => {
      setMessages(prev => [...prev, msg]);
      console.log('Message received:', msg);
    })


     
    setInputValue('');
    setIsAi(false);
  };
  console.log('Messages:', messages);

  return (
    <StudentTemplate>
      <ToastContainer />
      <div className="w-[70%] h-screen ml-[3vw] rounded-lg border-2 border-black bg-[#DDDDDD] flex flex-col items-center justify-between">
        <div className="w-full h-[90%] p-[2vh] flex flex-col gap-6 overflow-y-scroll">
          {messages.map((msg, idx) => {
            const isSender = msg.studentId === user._id &&  msg.username !== 'AI';

            return (
              <div
                key={idx}
                className={`flex gap-[2vw] items-start ${isSender ? 'flex-row-reverse w-full' : ''}`}
              >
                <img
                  src={msg.avatar || (isSender
                    ? "https://randomuser.me/api/portraits/men/32.jpg"
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-e73lHSywvwHbtQulEd1uIwl40tbvVkJwjQ&s")}
                  alt={msg.username}
                  className={`rounded-full h-[7vh] w-[7vh] border-2 ${isSender ? 'border-[#D6E6FF]' : 'border-[#E2FFC9]'} shadow`}
                />
                <div className="relative flex flex-col gap-[1vh]">
                  {/* Polygon */}
                  <img
                    src={Left_Polygon}
                    alt=""
                    className={`absolute top-3 w-[5vw] object-contain h-[4vh] ${isSender ? '-right-[2.5vw]' : '-left-[2.5vw]'}`}
                    style={{
                      filter: isSender
                        ? 'brightness(0) saturate(100%) invert(70%) sepia(10%) saturate(500%) hue-rotate(190deg) brightness(110%)'
                        : 'brightness(0) saturate(100%) invert(80%) sepia(10%) saturate(500%) hue-rotate(60deg) brightness(110%)',
                      transform: isSender ? 'rotate(15deg) scaleX(-1)' : 'rotate(-15deg)'
                    }}
                  />
                  <div className={`${isSender ? 'bg-[#D6E6FF]' : 'bg-[#E2FFC9]'} rounded-2xl px-6 py-3 min-w-[18vw] max-w-[28vw] shadow-md`}>
                    <div className="flex justify-between items-center mb-1">
                      <h1 className={`text-[2vh] font-bold ${isSender ? 'text-[#2257A7]' : 'text-[#3A7F21]'}`}>
                        {isSender ? ('You') : msg.username}

                      </h1>
                      <p className={`text-[1.5vh] ${isSender  ? 'text-[#2257A7]' : 'text-[#3A7F21]'}`}>
                        {msg.phone || ''}
                      </p>
                    </div>
                    <p className="text-[1.8vh] text-black font-semibold">
                      {msg.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="w-full h-[10%] flex items-center justify-between px-5 bg-[#F8FAFB] border-t border-[#e0e0e0]">
          <IoIosAddCircle className="text-blue-400 text-[4vh] cursor-pointer hover:text-blue-600 transition" />
          <input
            type="text"
            placeholder="Enter Your Message Here"
            className="h-[70%] rounded-md px-4 py-2 w-[85%] text-[1.8vh] border border-gray-300 focus:ring-2 focus:ring-blue-200 outline-none bg-white shadow"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <div className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <FaRobot
              className={`text-blue-400 text-[3vh] ${isAi ? 'bg-blue-100 rounded-full p-1' : ''}`}
              onClick={() => {
                setIsAi(prev => {
                  const newIsAi = !prev;
                  if (newIsAi) {
                    setInputValue(val => val.startsWith('/Ai') ? val : `/Ai ${val}`.trim());
                  } else {
                    setInputValue(val => val.replace(/^\/Ai\s*/, ''));
                  }
                  return newIsAi;
                });
              }}
            />
          </div>
          <div className="bg-blue-500 p-3 rounded-full shadow-md hover:bg-blue-600 transition cursor-pointer">
            <IoSend className="text-white text-[3vh]" onClick={handleSendMessage} />
          </div>
        </div>
      </div>
    </StudentTemplate>
  )
}

export default StudentGroup