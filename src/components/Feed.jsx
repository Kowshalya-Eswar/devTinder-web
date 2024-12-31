import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import Card from './Card';

const Feed = () => {
  const feed = useSelector((store) => store.feed);  // Get feed data from Redux store
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if (feed && feed.length > 0) return;  // Avoid fetching if feed already exists
      const feedRes = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(feedRes.data);  // Logging the fetched data
      dispatch(addFeed(feedRes.data));  // Dispatch the data to the Redux store
    } catch (err) {
      console.error('Error fetching feed:', err);  // Error handling
    }
  };

  useEffect(() => {
    getFeed();  // Fetch feed when component mounts
  }, [dispatch, feed]);  // Run getFeed on component mount or feed state change

  if (!feed || feed.length === 0) {
    return <div>Loading...</div>;  // Display loading state if no feed
  }

  return (
    <div className="flex justify-center my-10">
      {/* Render Card component with the first item from the feed */}
      <Card user={feed[0]} />
    </div>
  );
};

export default Feed;
