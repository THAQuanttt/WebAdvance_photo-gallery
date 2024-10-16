import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Config from '../../config/configuration';

const PhotoDetails = () => {
  // Detail Photo
  const [photo, setPhoto] = useState(null);
  // Loading
  const [loading, setLoading] = useState(true);
  // Handle Error
  const [error, setError] = useState(null);

  // ID: get id of Photo in Params
  // Such as: If URL is: http://localhost:3000/photos/ow8IIlkzbUw, id will be ow8IIlkzbUw
  // use useParams to get ID from URL
  const { id } = useParams();

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const response = await axios.get(`${Config.FETCH_PHOTO_DATA}/${id}`, {
          params: {
            client_id: process.env.REACT_APP_API_KEY,
          },
        });
        console.log(response.data);
        setPhoto(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photo details:', error);
        setError('Failed to load photo details. Please try again.');
        setLoading(false);
      }
    };

    fetchPhotoDetails();
  }, 
  // When ID change, re-render component 
    [id] );

  if (loading) return <div>Loading...</div>;  // Text Loading
  if (error) return <div>{error}</div>;       // Text when Error
  if (!photo) return null;    

  return (
    <div className="photo-details">
      <Link to="/">Back to Gallery</Link>
      <img src={photo.urls.regular} alt={photo.alt_description} />
      <h2>{photo.topics[0]?.title || 'Untitled'}</h2>
      <p>By: {photo.user.name}</p>
      <p>{photo.alt_description || 'No description available.'}</p>
    </div>
  );
};

export default PhotoDetails;