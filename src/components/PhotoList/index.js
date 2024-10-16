import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Config from '../../config/configuration';

const PhotoList = () => {
  // List photo
  const [photos, setPhotos] = useState([]);
  // Default page
  const [page, setPage] = useState(1);

  // hasMore, used to load more photo when user scroll to end of the window, If there is no image left, set hasMore is false
  const [hasMore, setHasMore] = useState(true);
  // Handle Error
  const [error, setError] = useState(null);
  // Function fetchPhoto, used to load photo from unsplash.
 const fetchPhotos = async () => {
    try {
      // Load 20 photo
      const response = await axios.get(Config.FETCH_PHOTOS, {
        params: {
          client_id: process.env.REACT_APP_API_KEY,
          page: page,
          per_page: 20,
        },
      });
      
      // If there are no more images, set hasMore is false
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        // Add photos data to list photos
        setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
        // increase number of pages
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      setError(`Failed to load list photo. Please try again. Error: ${error.message}`);
    }
  };

  useEffect(() => {
    // Call fetchPhotos when component is mounted
    fetchPhotos();
    // Warning : React Hook useEffect has a missing dependency: 'fetchPhotos'. Either include it or remove the dependency array.
    // fetchPhotos is a function, not variable.
  }, []);
  
  if (error) return <div>{error}</div>;       // Text when Error

  return (
    <div className="photo-list">
      <h1>Unsplash Photo Gallery</h1>
      <InfiniteScroll
        dataLength={photos.length}                      // Number of length
        next={fetchPhotos}                              // Call function fetchPhotos to load another photo
        hasMore={hasMore}                               // If hasMore is false: No more pictures to load
        loader={<h4>Loading...</h4>}                    // text loader
        endMessage={<p>No more photos to load.</p>}     // Text when end of the window and No more pictures to load
      >
        <div className="photo-grid">
          {photos.map((photo) => (
            <Link to={`/photos/${photo.id}`} key={photo.id}>
              <div className="photo-item">
                <img src={photo.urls.thumb} alt={photo.alt_description} />
                <p>{photo.user.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PhotoList;