import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const FollowContext = createContext();

export const FollowContextProvider = ({ children }) => {
    const [followers, setFollowers] = useState([]);
    const [error, setError] = useState(null);
     const [followChanged, setFollowChanged] = useState(false); // Additional state to track follow/unfollow actions
    const  [toFollow,setToFollow]=useState([])
      
    
   
    const fetchFollowers = async (username) => {
        try {
            const res = await axios.get(`/api/follow?username=${username}`);
            console.debug(res)
            setFollowers(res.data.follow);
            
            setError(null);
        } catch (error) {
            setError("An error occurred while trying to fetch followers. Please try again later.");
            console.error("Fetch followers error:", error);
        }
    };

    const followUser = async (username, followUsername) => {
        try {
            const res = await axios.post("/api/follow", { username, followUsername });
            if (res.data.user) {
                setFollowChanged(!followChanged); // Toggle followChanged state
                setError(null);
                return true;
            }
            setError(res.data.message);
            return false;
        } catch (error) {
            setError("An error occurred while trying to follow the user. Please try again later.");
            console.error("Follow error:", error);
            return false;
        }
    };

    const unfollowUser = async (username, followUsername) => {
        try {
            const res = await axios.delete("/api/follow", { data: { username, followUsername } });
            if (res.data.user) {
                setFollowChanged(!followChanged); // Toggle followChanged state
                setError(null);
                console.log(res.data)
                return true;
            }
            setError(res.data.message);
            return false;
        } catch (error) {
            setError("An error occurred while trying to unfollow the user. Please try again later.");
            console.error("Unfollow error:", error);
            return false;
        }
    };

    const fetchToFollow=async(username,numberOfUsers) => {
        try {
            const res=await axios.get(`/api/follow/shuffle?username=${username}&numberOfUsers=${numberOfUsers}`);
            if(res.data.users){
                
                setToFollow(res.data.users)
            }
        } catch (error) {
            console.error(error)
        }
       

    }
  
    return (
        <FollowContext.Provider value={{ followers,toFollow, followUser, unfollowUser, fetchFollowers,fetchToFollow, error, followChanged }}>
            {children}
        </FollowContext.Provider>
    );
};
