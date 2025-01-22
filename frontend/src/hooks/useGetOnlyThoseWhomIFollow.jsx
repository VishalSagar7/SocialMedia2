import { useEffect } from "react"
import axios from "axios";
import { API_ENDPOINT } from "../../utils/constants";
import { useDispatch } from 'react-redux'
import { setPostsOnlyWhomIFollow } from "../redux/postSlice";

const useGetOnlyThoseWhomIFollow = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOnlyThoseWhomIFollow = async () => {
            try {

                const res = await axios.get(`${API_ENDPOINT}/api/v1/post/getonlyfollowingposts`, { withCredentials: true });

                if (res?.data?.success) {
                    // console.log("posts i follow", res?.data?.posts);
                    dispatch(setPostsOnlyWhomIFollow(res?.data?.posts));

                }

            } catch (error) {
                console.log(error);

            }
        }

        fetchOnlyThoseWhomIFollow();

    }, []);
};


export default useGetOnlyThoseWhomIFollow;