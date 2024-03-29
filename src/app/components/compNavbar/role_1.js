'use client'
import React, { useState , useEffect ,  useRef } from 'react';
import Link from 'next/link'
// import '@fontsource/ntr'
import '../../globals.css'
import '@fontsource/mitr';
import {FiMenu} from 'react-icons/fi';
import {AiOutlineClose} from 'react-icons/ai';
import {usePathname } from 'next/navigation';
import { CompLanguageProvider, useLanguage } from '../compLanguageProvider_role_1';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FaBell } from "react-icons/fa";
import { AiFillAlert } from "react-icons/ai";
import { IoTime } from "react-icons/io5";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6"; 
import { io } from 'socket.io-client';
import audioFile from "../../../../public/audio/notification.mp3";
import { TiWarning } from "react-icons/ti";




// const socket = socketIoClient('http://localhost:4000', {
//   path: '/socket.io',
//   withCredentials: true,
//   transports: ['websocket'],
// });

// socket.on('connect', () => {
//   console.log('WebSocket connected');
// });

// socket.on('disconnect', (reason) => {
//   console.log('WebSocket disconnected:', reason);
// });

// socket.on('connect_error', (error) => {
//   console.error('Error establishing WebSocket connection:', error);
// });



function CompNavbar() {
  const { t } = useTranslation();
  // const [notification, setNotification] = useState(null);
  const { language, toggleLanguage } = useLanguage();
  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState('');
  const [shouldCallEditLanguage, setshouldCallEditLanguage] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 
  const [notify, setNotify] = useState(false); 
  const [notification, setNotification] = useState('');
  const [audio, setAudio] = useState(null);
  const [sound, setSound] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [session_Expired, setSession_Expired] = useState(false);


  useEffect(() => {
    setAudio(new Audio(audioFile));
    
  }, []);

  const playAudio = () => {
    if (audio && sound) {
      audio.addEventListener('ended', () => {
        // เมื่อเพลงเล่นจบ ให้ทำการเริ่มเล่นใหม่
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      });
  
      // เริ่มเล่นเพลงครั้งแรก
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  };

  const stopAudio = () => {
    if (audio && typeof audio.pause === 'function') {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  // useEffect(() => {
  //   const eventSource = new EventSource('https://platform-jorpor.vercel.app/api/emergency_notify');

  //   eventSource.onmessage = (event) => {
  //     if (event.data.trim() !== '') {
  //       const data = JSON.parse(event.data);
  //       setNotification(data.message);
  //       setShowPopup(true);
  //     }
  //   };

  //   eventSource.onerror = (error) => {
  //     console.error('SSE Error:', error);
  //     eventSource.close();
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);

  // // เพิ่มโค้ดที่ต้องการให้ทำเมื่อมีการแจ้งเตือน
  // useEffect(() => {
  //   if (showPopup) {
  //     // ทำสิ่งที่คุณต้องการเมื่อมีการแจ้งเตือน
  //     console.log('Notification:', notification);
  //   }
  // }, [showPopup, notification]);

  useEffect(() => {
    if (showPopup) {
      playAudio();
    } 
  }, [showPopup]);



  useEffect(() => {
    const storedUser_id = localStorage.getItem('id');

    if (!storedUser_id) {
      setSession_Expired(true)
    }
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/emergency_notify');
        
        if (response.status === 200) {
          const emergencyNotifications = response.data;
          console.log('Emergency Notifications:', emergencyNotifications,emergencyNotifications.dbexamine_name[0] , emergencyNotifications.length);
          if (emergencyNotifications.dbexamine_name.length > 0) {
            setNotification(emergencyNotifications.dbexamine_name[0])
          }
        } else {
          console.error('Failed to retrieve emergency notifications');
        }
      } catch (error) {
        console.error('Error fetching emergency notifications:', error);
      }
    };

    console.log("Attempting to connect to Socket.IO...");


    const socket = io('http://192.168.1.9:3000', {
      withCredentials: true,
      transports: ['websocket']
    });
    
    

    socket.on('connect', () => {
      console.log('WebSocket connected: ');
      console.log(socket.connected);
      socket.on('emergencyNotify', (res) => {
        setNotification(res);
        setShowPopup(true);
        setSound(true);
        console.log("MESSAGE EMERGENCY: ", res);
        console.log("2", socket.connected);
        setTimeout(() => {
          socket.disconnect();
          console.log('Socket.IO connection closed');
        }, 1000);
      });
    });

    socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    fetchData(); 

    return () => {
      socket.disconnect();
      console.log('Socket.IO connection closed');
    };
  }, []); 


  // useEffect(() => {
  //   if (!showPopup) {
  //     stopAudio();
  //   }
  // }, [showPopup]);


  const currentPath = usePathname();
  const outsideClickRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (outsideClickRef.current && !outsideClickRef.current.contains(e.target)) {
        setToggle(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const logout = () => {
    // const profileImageUrl = localStorage.getItem('profileImageUrl');
    const rememberedData = localStorage.getItem('rememberedData');

    localStorage.clear(); 
    
    // if (profileImageUrl) {
    //   localStorage.setItem('profileImageUrl', profileImageUrl); 
    // }
    
    if (rememberedData) {
      localStorage.setItem('rememberedData', rememberedData);
      // localStorage.removeItem('rememberedData', rememberedData);
    }

    
  
    window.location.href = '/login';
  };
  

  const close = async () => {
    try {

      const editedData = { notification , change: true }
      const data = JSON.stringify(editedData)

      const response = await axios.post('/api/emergency_notify', 
      data, {
        headers: { 'Content-Type': 'application/json' 
      }});
      
      
      if (response.status === 200) {
        const emergencyNotifications = response.data;
        console.log('Emergency Notifications:', emergencyNotifications);
       
      } else {
        console.error('Failed to retrieve emergency notifications');
      }
    } catch (error) {
      console.error('Error fetching emergency notifications:', error);
    }
  };
 
    

  return (
    < CompLanguageProvider>
        <div className='w-full h-[60px] items-center  bg-[#5A985E] fixed top-0 left-0 ' >
        <div className=' mx-auto flex justify-between  items-center py-2 px-8 md:h-[60px] w-full   '>
            <div className='text-[#fff]  relative md:top-[5px] pb-3 pt-2  font-bold text-[24px] lg:mr-[25px] ' >
                <Link href='/select'>JorPor</Link>
                </div>
             
            <div className={`lg:h-[60px] hidden lg:flex tracking-wider items-center text-white text-[16px]  mx-auto justify-center `}>
            
                
                <Link href="/examineList" 
                  style={{ whiteSpace: 'nowrap' }}
                  className={` px-5 relative top-[5px] pb-[14px] pt-3  rounded-t-[20px]  hover:text-[#5A985E] hover:bg-[#F5F5F5] ${
                    currentPath === '/examineList' || currentPath === '/examine' || currentPath === '/checklistExamine' || currentPath === '/checklistEmployee' || currentPath === '/reportResults' || currentPath === '/select'  ? 'text-[#5A985E] bg-[#F5F5F5]  border border-b-0' : 'text-[#fff]'}`}
                  >{t('Examine')}</Link>
                
                <Link href="/notify"
                  style={{ whiteSpace: 'nowrap' }}
                  className={` px-5 relative top-[5px] pb-[14px] pt-3  rounded-t-[20px]  hover:text-[#5A985E] hover:bg-[#F5F5F5] ${
                    currentPath === '/notify'  ? 'text-[#5A985E] bg-[#F5F5F5]  border border-b-0'  : 'text-[#fff]'}`} 
                  >{t('Notify')}</Link>                
                
                <Link href="/response_role_1" 
                  style={{ whiteSpace: 'nowrap' }}
                  className={` px-5 relative top-[5px] pb-[14px] pt-3  rounded-t-[20px]  hover:text-[#5A985E] hover:bg-[#F5F5F5] ${
                    currentPath === '/response_role_1' || currentPath === '/responsedetail_role_1'? 'text-[#5A985E] bg-[#F5F5F5]  border border-b-0' : 'text-[#fff]'}`}
                  >{t('Response')}</Link>
                
                <Link href="/plan_role_1" 
                  style={{ whiteSpace: 'nowrap' }}
                  className={` px-5 relative top-[5px] pb-[14px] pt-3  rounded-t-[20px]  hover:text-[#5A985E] hover:bg-[#F5F5F5] ${
                    currentPath === '/plan_role_1' ? 'text-[#5A985E] bg-[#F5F5F5]  border border-b-0' : 'text-[#fff]'}`}
                  >{t('Plan')}</Link>
                
                <Link href="/meeting_role_1" 
                  style={{ whiteSpace: 'nowrap' }}
                  className={` px-5 relative top-[5px] pb-[14px] pt-3  rounded-t-[20px]  hover:text-[#5A985E] hover:bg-[#F5F5F5] ${
                    currentPath === '/meeting_role_1' ? 'text-[#5A985E] bg-[#F5F5F5]  border border-b-0' : 'text-[#fff]'}`}
                  >{t('Meeting')}</Link>
                
                <Link href="/employee_role_1" 
                  style={{ whiteSpace: 'nowrap' }}
                  className={` px-5 relative top-[5px] pb-[14px] pt-3  rounded-t-[20px]  hover:text-[#5A985E] hover:bg-[#F5F5F5] ${
                    currentPath === '/employee_role_1' ? 'text-[#5A985E] bg-[#F5F5F5]  border border-b-0' : 'text-[#fff]'}`}
                  >{t("Employee list")}</Link>
                
                <Link href="/profile_role_1" 
                  style={{ whiteSpace: 'nowrap' }}
                  className={` px-5 relative top-[5px] pb-[14px] pt-3  rounded-t-[20px]  hover:text-[#5A985E] hover:bg-[#F5F5F5] ${
                    currentPath === '/profile_role_1' ? 'text-[#5A985E] bg-[#F5F5F5]  border border-b-0' : 'text-[#fff]'}`}
                  >{t('Profile')}</Link> 
                 
                </div >

                
              <div className='hidden lg:flex text-white  '>
                <div className=''>
                  {notify && (
                  <span 
                    className='absolute bg-red-500  rounded-full w-3 h-3 text-white flex items-center justify-center mt-4 ml-2 '
                    style={{ zIndex: 2 }}
                  >
                    <span className='text-[8px]'>1</span>
                  </span>
                  )}
                 <FaBell 
                  onClick={() => {setShowPopup(true); setTimeout(() => {setNotify(false);}, 100);}} 
                  className='relative cursor-pointer text-white mt-5 transition-transform transform  hover:translate-x-0.5'
                  style={{ zIndex: 1 }}
                />
              </div>
                <button   className="text-white px-5  relative top-[5px] pb-3 pt-[10px]  text-[15px]   hover:font-bold  rounded-md p-2 " onClick={toggleLanguage}>
                  {language}
                </button> 
                <button style={{ whiteSpace: 'nowrap' }} onClick={logout}  className={`pb-4 pt-[10px] text-[15px]     relative top-[5px] py-1  text-[#fff] hover:font-bold `}>{t("log out")}</button>
                </div>

            {toggle ? (
              <AiOutlineClose onClick={()=>setToggle(!toggle)} size={30} className='lg:hidden  block text-white'/> 
            ) : (
              <div className='flex  items-center'>
              <div className='mr-4 lg:hidden '>
                  {notify && (
                  <span 
                    className='absolute bg-red-500  rounded-full w-3 h-3 text-white flex items-center justify-center mt-[-5px] ml-2 '
                    style={{ zIndex: 2 }}
                  >
                    <span className='text-[8px]'>1</span>
                  </span>
                  )}
                 <FaBell 
                  onClick={() => {setShowPopup(true); setTimeout(() => {setNotify(false);}, 100); setSound(false)}} 
                  className='relative cursor-pointer text-white transition-transform transform  hover:translate-x-0.5'
                  style={{ zIndex: 1 }}
                />
              </div>
              <FiMenu onClick={()=>setToggle(!toggle)} size={25} className='lg:hidden block lg:mt-[20px] text-white'/>
              </div>

            )}
            </div>

            <div ref={outsideClickRef} className={` text-[18px]  lg:hidden flex flex-col w-[50%] md:w-[30%] h-screen mt-[-12px] md:mt-[-1px] fixed bg-[#80A582] ${toggle ? `left-[0]` : `left-[-100%]`}` }>
                
                <Link onClick={()=>setToggle(!toggle)} href="/examineList" style={{ whiteSpace: 'nowrap' }} className=' mt-[15px]  px-4 py-2  text-[#fff] hover:text-[#5A985E] hover:bg-[#fff]  '>{t('Examine')}</Link>
                <Link onClick={()=>setToggle(!toggle)} href="/notify" style={{ whiteSpace: 'nowrap' }} className='  px-4 py-2  text-[#fff] hover:text-[#5A985E] hover:bg-[#fff]  '>{t('Notify')}</Link>
                <Link onClick={()=>setToggle(!toggle)} href="/response_role_1" style={{ whiteSpace: 'nowrap' }} className='  px-4 py-2  text-[#fff] hover:text-[#5A985E] hover:bg-[#fff]  '>{t('Response')}</Link>
                <Link onClick={()=>setToggle(!toggle)} href="/plan_role_1" style={{ whiteSpace: 'nowrap' }} className='  px-4 py-2  text-[#fff] hover:text-[#5A985E] hover:bg-[#fff]  '>{t('Plan')}</Link>
                <Link onClick={()=>setToggle(!toggle)} href="/meeting_role_1" style={{ whiteSpace: 'nowrap' }} className='  px-4 py-2  text-[#fff] hover:text-[#5A985E] hover:bg-[#fff]  '>{t('Meeting')}</Link>
                <Link onClick={()=>setToggle(!toggle)} href="/employee_role_1" style={{ whiteSpace: 'nowrap' }} className='  px-4 py-2  text-[#fff] hover:text-[#5A985E] hover:bg-[#fff]  '>{t("Employee list")}</Link>
                <Link onClick={()=>setToggle(!toggle)} href="/profile_role_1" style={{ whiteSpace: 'nowrap' }} className='  px-4 py-2  text-[#fff] hover:text-[#5A985E] hover:bg-[#fff]  '>{t('Profile')}</Link>
                
                <button onClick={logout}  className='   text-left px-4 py-2  text-[#fff] hover:text-[#5A985E] hover:bg-[#fff]  '>{t("log out")}</button>

                <button className={`text-[16px] text-white hover:text-[#5A985E] hover:bg-[#F5F5F5] px-4 py-2`} onClick={() => { toggleLanguage(); setToggle(!toggle);  }}>
                  {language}
                </button>

            </div>
        
          
        </div>




         {showPopup && (
              <div className="bg-[#00000080] fixed inset-0 z-50 flex items-center justify-center">
             <div className="bg-[#FAE300]  text-center items-center text-black h-[400px]  absolute rounded-lg shadow-lg w-[300px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">

              <div className=' -rotate-45 ml-[-400px] w-[1000px] border border-red-400'>
                <div className="w-full bg-black   border-[20px] border-black "></div>
                <div className="w-full bg-black mt-5   border-[20px] border-black "></div>
                <div className="w-full bg-black mt-5  border-[20px] border-black "></div>
                <div className="w-full bg-black mt-5 border-[20px] border-black "></div>
                <div className="w-full bg-black mt-5   border-[20px] border-black "></div>
                <div className="w-full bg-black mt-5  border-[20px] border-black "></div>
               <div className="w-full bg-black  mt-5 border-[20px] border-black "></div>
                <div className="w-full bg-black mt-5   border-[20px] border-black "></div>
                <div className="w-full bg-black mt-5  border-[20px] border-black "></div>
               
               
               </div>

               <div className=' absolute z-10 bg-[#FAE300] py-5 w-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
               {notification ? (
                <div>
              <AiFillAlert className=' text-[50px] mx-auto mb-[10px] text-red-500  '/>
              <p className='text-[18px] mb-5'>{t("Emergency notification")}!!</p>

              {/* <p className='flex items-center justify-center '> <IoTime className=' mr-2'/> Time  : 15:25 น.</p>
              <p className='flex items-center justify-center mt-1'> <BsCalendar2DateFill className='text-[14px]  mr-2'/> Date : 10/1/2024</p>
              <p className='flex items-center justify-center mt-1'> <FaLocationDot className=' mr-2'/> Location : Zone A</p> */}
              
             
                <div>
                  <p>{t('Location')} : {notification.location}</p>

                  <p>{t('Date')} : {notification.date}</p>
                  <p>{t('Time')} : {notification.time} {t('N')}</p>
                </div>
                </div>
              ) : (
                <div className='  mx-auto h-[150px] items-center justify-center text-center mt-5 text-black'>
                <div className='p-2 px-6 '>
                <TiWarning className='text-[30px] mx-auto text-[#5A985E]' />
            
                <h2 className=' py-1  text-[11px] md:text-[15px]'>{t("No information")}</h2>
              </div>
              </div> 
              )}


              <button className="flex mx-auto  mt-7 items-center text-[15px]  bg-[#5A985E] text-white px-3 py-1  rounded hover:bg-green-600" onClick={() => {setShowPopup(false); stopAudio(); close()}}>{t('Close')}</button>
              </div>
           </div>
           </div>

           
           
           

            )}

            {session_Expired && (
              <div className="bg-[#00000080] fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white text-center items-center text-black h-[150px] border border-grey-400 rounded-lg shadow-lg w-[300px]">
                  <div className=' mt-5'>
                    <p className='text-[18px]  font-bold'>{t("Session Expired")}</p>
                    <p className='text-[15px] '>{t("Please log in again")}</p>

                    <button className="flex mx-auto mt-5 items-center text-[15px] bg-[#5A985E] text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => { logout() }}>{t('OK')}</button>
                  </div>
                </div>
              </div>
            )}
        
        </CompLanguageProvider>
    ) 
 }
 export default CompNavbar;

 
  