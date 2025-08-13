import React, { useEffect, useState, useRef } from 'react'
import StudentTemplate from '../../components/Templates/Admin/StudentTemplate'
import { IoIosAddCircle } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { FaRobot } from 'react-icons/fa6';
import { MdAttachFile, MdEmojiEmotions } from 'react-icons/md';
import { BsEmojiSmile, BsEmojiHeartEyes, BsEmojiLaughing, BsEmojiWink, BsEmojiFrown, BsEmojiAngry } from 'react-icons/bs';
import socket from '../../config/socket.mjs';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentGroup = () => {
  const [isAi, setIsAi] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [messages, setMessages] = useState([
    // Add some test messages to ensure scrolling works
    { studentId: 'test1', username: 'Test User 1', content: 'This is a test message to ensure scrolling works properly. This message is long enough to test scrolling functionality.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { studentId: 'test2', username: 'Test User 2', content: 'Another test message to make sure we have enough content to scroll through.', avatar: 'https://randomuser.me/api/portraits/women/32.jpg' },
    { studentId: 'test3', username: 'Test User 3', content: 'Third test message for scrolling functionality testing.', avatar: 'https://randomuser.me/api/portraits/men/33.jpg' },
    { studentId: 'test4', username: 'Test User 4', content: 'Fourth test message to ensure proper scroll behavior.', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
    { studentId: 'test5', username: 'Test User 5', content: 'Fifth test message for scroll testing purposes.', avatar: 'https://randomuser.me/api/portraits/men/34.jpg' },
    { studentId: 'test6', username: 'Test User 6', content: 'Sixth test message to verify scroll functionality.', avatar: 'https://randomuser.me/api/portraits/women/34.jpg' },
    { studentId: 'test7', username: 'Test User 7', content: 'Seventh test message for scroll behavior verification.', avatar: 'https://randomuser.me/api/portraits/men/35.jpg' },
    { studentId: 'test8', username: 'Test User 8', content: 'Eighth test message to ensure smooth scrolling.', avatar: 'https://randomuser.me/api/portraits/women/35.jpg' },
    { studentId: 'test9', username: 'Test User 9', content: 'Ninth test message for scroll functionality testing.', avatar: 'https://randomuser.me/api/portraits/men/36.jpg' },
    { studentId: 'test10', username: 'Test User 10', content: 'Tenth test message to verify proper scroll behavior.', avatar: 'https://randomuser.me/api/portraits/women/36.jpg' },
  ]);
  const user = useSelector(state => state.auth.user);
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const container = e.currentTarget;
    container.scrollTop += e.deltaY;
  };

  // Emoji data
  const emojis = [
    { icon: '😊', name: 'smile' },
    { icon: '😂', name: 'joy' },
    { icon: '❤️', name: 'heart' },
    { icon: '👍', name: 'thumbsup' },
    { icon: '🎉', name: 'party' },
    { icon: '🔥', name: 'fire' },
    { icon: '😍', name: 'heart_eyes' },
    { icon: '🤔', name: 'thinking' },
    { icon: '😎', name: 'cool' },
    { icon: '🥳', name: 'celebration' },
    { icon: '💯', name: 'hundred' },
    { icon: '✨', name: 'sparkles' },
    { icon: '👏', name: 'clap' },
    { icon: '🙌', name: 'raised_hands' },
    { icon: '💪', name: 'muscle' },
    { icon: '🎯', name: 'target' },
  ];

  const addEmoji = (emoji) => {
    setInputValue(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB', {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      
      setSelectedFile(file);
      setShowFileUpload(false);
      
      // Add file info to input
      setInputValue(prev => prev + ` 📎 ${file.name}`);
      
      toast.success(`File "${file.name}" selected`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim() && !selectedFile) return;
 
    socket.emit('newMessage', {
      studentId: user._id,
      username: user.name,
      content: inputValue,
      avatar: user.profile_image,
      token: user.token,
      file: selectedFile ? {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type
      } : null
    });

    socket.on('messageReceived', (msg) => {
      setMessages(prev => [...prev, msg]);
      console.log('Message received:', msg);
    })

    setInputValue('');
    setSelectedFile(null);
    setIsAi(false);
    setShowEmojiPicker(false);
    setShowFileUpload(false);
  };
  
  console.log('Messages:', messages);

  return (
    <StudentTemplate>
      <ToastContainer />
      <div className="w-full h-[87vh] rounded-3xl bg-gradient-to-br from-white/90 via-white/70 to-white/40 backdrop-blur-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-white/30 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/30 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FaRobot className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Student Group Chat
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                {messages.length} messages • {new Set(messages.map(m => m.studentId)).size} participants
              </p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div 
          className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            minHeight: '0',
            maxHeight: 'calc(100vh - 200px)',
          }}
          onWheel={handleWheel}
        >
          {messages.map((msg, idx) => {
            const isSender = msg.studentId === user._id && msg.username !== 'AI';

            return (
              <div
                key={idx}
                className={`flex gap-4 items-start animate-fadeIn ${isSender ? 'flex-row-reverse' : ''}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Avatar */}
                <div className="relative">
                  <div className={`w-12 h-12 rounded-2xl overflow-hidden shadow-lg border-2 ${
                    isSender 
                      ? 'border-blue-400/50 bg-gradient-to-br from-blue-400 to-blue-500' 
                      : 'border-purple-400/50 bg-gradient-to-br from-purple-400 to-purple-500'
                  }`}>
                    <img
                      src={msg.avatar || (isSender
                        ? "https://randomuser.me/api/portraits/men/32.jpg"
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-e73lHSywvwHbtQulEd1uIwl40tbvVkJwjQ&s")}
                      alt={msg.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Online indicator */}
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    isSender ? 'bg-green-400' : 'bg-purple-400'
                  }`}></div>
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col gap-2 max-w-[70%] ${isSender ? 'items-end' : 'items-start'}`}>
                  {/* Username */}
                  <div className={`text-sm font-semibold ${isSender ? 'text-blue-600' : 'text-purple-600'}`}>
                    {isSender ? 'You' : msg.username}
                  </div>
                  
                  {/* Message Content */}
                  <div className={`relative group ${
                    isSender 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                      : 'bg-gradient-to-r from-white/90 to-white/70 text-gray-800 backdrop-blur-sm border border-white/30'
                  } rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 max-w-full`}>
                    
                    {/* Message text */}
                    <p className="text-sm leading-relaxed font-medium mb-6">
                      {msg.content}
                    </p>
                    
                    {/* File attachment display */}
                    {msg.file && (
                      <div className={`mb-4 p-3 rounded-xl ${
                        isSender ? 'bg-blue-400/20' : 'bg-gray-100/50'
                      }`}>
                        <div className="flex items-center gap-2">
                          <MdAttachFile className="text-lg" />
                          <span className="text-sm font-medium">{msg.file.name}</span>
                        </div>
                        <p className="text-xs opacity-70 mt-1">
                          {(msg.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    )}
                    
                    {/* Time indicator */}
                    <div className={`absolute bottom-2 text-xs opacity-70 ${
                      isSender ? 'right-4 text-blue-100' : 'left-4 text-gray-500'
                    }`}>
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    
                    {/* Hover effect */}
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                      isSender ? 'bg-white' : 'bg-gray-900'
                    }`}></div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-xl border-t border-white/30 relative">
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-24 left-6 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/30 z-50">
              <div className="grid grid-cols-4 gap-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => addEmoji(emoji.icon)}
                    className="p-2 text-2xl hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
                  >
                    {emoji.icon}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* File Upload Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
          />

          <div className="flex items-center gap-4 bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30">
            {/* Attachment Button */}
            <button 
              className="p-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-md hover:shadow-lg relative"
              onClick={triggerFileUpload}
            >
              <MdAttachFile className="text-gray-600 text-xl" />
              {selectedFile && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
              )}
            </button>
            
            {/* Emoji Button */}
            <button 
              className="p-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <MdEmojiEmotions className="text-gray-600 text-xl" />
            </button>
            
            {/* Input Field */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type your message here..."
                className="w-full px-4 py-3 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 font-medium text-sm"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              {selectedFile && (
                <div className="absolute top-1 right-2 text-xs text-blue-600 font-medium">
                  📎 {selectedFile.name}
                </div>
              )}
            </div>
            
            {/* AI Toggle */}
            <button 
              className={`p-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg ${
                isAi 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-600'
              }`}
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
            >
              <FaRobot className="text-xl" />
            </button>
            
            {/* Send Button */}
            <button 
              className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              onClick={handleSendMessage}
            >
              <IoSend className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </StudentTemplate>
  )
}

export default StudentGroup