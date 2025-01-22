import React, { useState,useEffect } from 'react'
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';
import { Chip } from '@mui/material';
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Dialog } from '@mui/material';
import CommentDialog from './CommentDialog';
import { setSelectedPost } from '../redux/postSlice';
import axios from 'axios';
import { API_ENDPOINT } from '../../utils/constants';
import { setAuthuser, setUserProfile } from '../redux/authSlice';
import { toast } from 'react-toastify';
import { setRefreshProfilePage } from '../redux/authSlice';




const Profile = () => {

  const params = useParams();
  const [activetab, setActiveTab] = useState('posts');
  const dispatch = useDispatch();


  const userId = params.id;

  useGetUserProfile(userId);

  const { userProfile, user } = useSelector(store => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  // const isFollowing = false;
  const [isFollowing, setIsFollowing] = useState(user?.following.includes(userProfile?._id));

  // console.log("isfollowing" , isFollowing);
  // console.log("my profile", user);
  // console.log("user profile" , userProfile);
  
  


  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const displayedPosts = activetab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  console.log("displayrd possts" , displayedPosts);
  

  const followUnfollwHandler = async () => {
    try {
      const res = await axios.get(`${API_ENDPOINT}/api/v1/user/followunfollow/${userProfile?._id}`, { withCredentials: true });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        console.log(res?.data);
        dispatch(setAuthuser(res?.data?.updatedUser));
        // console.log("updated user", res?.data?.updatedUser);
        
        // console.log("jiskofolow karunga", res?.data?.updatedJiskoFollowKarunga);
        dispatch(setUserProfile(res?.data?.updatedJiskoFollowKarunga))
        
      };

    } catch (error) {
      console.log(error);

    } finally {
      // setIsFollowing(!isFollowing);
      dispatch(setRefreshProfilePage());
    }
  };

  useEffect(() => {
    setIsFollowing(user?.following.includes(userProfile?._id));
  }, [user, userProfile]);

  return (
    <div className='flex max-w-5xl justify-center mx-auto pl-10 '>

      <div className=' flex flex-col gap-20 p-8  w-full'>

        <div className='grid grid-cols-2'>

          <section className='flex items-center justify-center'>
            <Avatar sx={{ height: '150px', width: '150px' }} src={userProfile?.profilePicture} />
          </section>

          <section>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-2'>
                <span className='text-lg font-semibold'>{userProfile?.username}</span>

                {
                  isLoggedInUserProfile ? (
                    <>
                      <Link to='/account/edit'>
                        <button className='bg-gray-100 rounded-lg px-[10px] font-semibold py-[3px] hover:bg-gray-100 '>Edit profile</button>
                      </Link>
                      {/* <button className='bg-gray-100 rounded-lg px-[10px] font-semibold py-[3px] hover:bg-gray-100 '>View archive</button>
                      <button className='bg-gray-100 rounded-lg px-[10px] font-semibold py-[3px] hover:bg-gray-100 '>Ad tools</button> */}
                    </>
                  ) : (

                    isFollowing ? (
                      <>
                        <button
                          onClick={followUnfollwHandler}
                          className='bg-gray-100 rounded-lg px-[10px] font-semibold py-[3px] hover:bg-gray-100 hover:shadow-sm '
                        >
                          Unfollow
                        </button>
                        <Link to="/chat">
                          <button
                            className='bg-gray-100 rounded-lg px-[10px] font-semibold py-[3px] hover:bg-gray-100 hover:shadow-sm '
                          >
                            Message
                          </button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={followUnfollwHandler}
                          className='bg-[#0095F6] rounded-lg px-[10px] text-white font-semibold py-[3px] hover:bg-[#3999d9] hover:shadow-sm '
                        >
                          Follow
                        </button>
                      </>
                    )


                  )
                }

              </div>

              <div className='flex items-center gap-4'>
                <p><span className='font-semibold'>{userProfile?.posts?.length}</span> Posts</p>
                <p><span className='font-semibold'>{userProfile?.followers?.length}</span> Followers</p>
                <p><span className='font-semibold'>{userProfile?.following?.length}</span> Following</p>
              </div>

              <div>
                <p className='font-semibold'> {userProfile?.name} </p>
                <Chip sx={{ fontWeight: '600', fontSize: '12px' }} label={`@${userProfile?.username}`} />
                <p className=''>{userProfile?.bio || 'Prime Minister of India.'}</p>
              </div>

            </div>
          </section>

        </div>

        <div className='border-t border-gray-200'>
          <div className='flex items-center gap-10 text-sm'>

            <span
              onClick={() => handleTabChange('posts')}
              className={`py-3 cursor-pointer ${activetab === 'posts' ? 'font-bold' : 'font-normal'}`}
            >
              POSTS
            </span>

            <span
              onClick={() => handleTabChange('saved')}
              className={`py-3 cursor-pointer ${activetab === 'saved' ? 'font-bold' : 'font-normal'}`}
            >
              SAVED
            </span>

          </div>
          <div className='grid grid-cols-3 gap-4'>
            {
              displayedPosts?.map((post) => {
                return (
                  <div
                    key={post?._id}
                    className='relative group cursor-pointer '
                  >

                    <img
                      src={post?.image}
                      className='rounded-sm my-2 w-full aspect-square object-cover'
                    />
                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>

                      <div className='flex items-center text-white space-x-4'>

                        <button className='flex items-center gap-2 hover:text-gray-300'>
                          <FaRegHeart size={'25px'} />
                          <span>{post?.likes?.length}</span>
                        </button>

                        <button className='flex items-center gap-2 hover:text-gray-300'>
                          <FaRegComment size={'25px'} />
                          <span>{post?.comments?.length}</span>
                        </button>

                      </div>

                    </div>

                    <p className=' text-sm font-semibold'>{ post?.caption }</p>

                  </div>
                )
              })
            }
          </div>
        </div>

      </div>


    </div>
  )
}

export default Profile;
