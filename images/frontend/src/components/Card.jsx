import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export const Card = ({item}) => {

    const [isRead, setIsRead] = useState(item.read);
    const [isFavorite, setIsFavorite] = useState(item.favorite);
    const [genres, setGenres] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

      const handleUpdateReadStatus = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/mangas/${item.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ read: !isRead}), // Send only the 'read' field to update
          });

          console.log(response)
    
          if (!response.ok) {
            throw new Error('Failed to update read status');
          }
    
          // Handle successful update - Maybe update local state or fetch new data
          setIsRead(!isRead); // Toggle the 'isRead' state after successful update
    
        } catch (error) {
          // Handle error
          console.error('Error updating read status:', error);
        }
      };

      const handleUpdateFavoriteStatus = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/mangas/${item.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ favorite: !isFavorite}), // Send only the 'read' field to update
          });

          console.log(response)
    
          if (!response.ok) {
            throw new Error('Failed to update favorite status');
          }
    
          // Handle successful update - Maybe update local state or fetch new data
          setIsFavorite(!isFavorite); // Toggle the 'isRead' state after successful update
    
        } catch (error) {
          // Handle error
          console.error('Error updating favorite status:', error);
        }
      };

      useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
    
          try {
            const response = await fetch(`http://localhost:3000/api/mangas/genres/${item.id}`);
            
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
    
            const result = await response.json();
            setGenres(result);
          } catch (error) {
            setError(error.message);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchData();
      }, [item.id]);

      if (isLoading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error: {error}</p>;
      }
    
      if (!genres) {
        return ''; // You might render a placeholder or loading state here
      }

  return (
    
                <div className='w-1/5 px-2 mb-8'>
                    <div className='w-full h-72 truncate mb-2'>
                        <img className='w-full' src={item.cover} />
                    </div>
                    <p className='text-md font-display font-semibold text-orange'>{item.title}</p>
                    <p className='text-sm font-mont text-black'>{item.author}</p>
                    <p className='text-xs font-mont text-black'>Volumes - {item.nrOfVolumes}</p>
                    <div className='w-full flex flex-row mt-2'>
                      {genres.map((genre, index) => (
                          <p key={index} className='text-xs'>
                            {genre.name}, 
                          </p>
                      ))}
                    </div>
                    <div className='w-full flex flex-row mt-2'>
                        {isFavorite ? <button onClick={handleUpdateFavoriteStatus} className='text-sm flex-auto border-2 border-orange rounded-2xl mr-2 bg-orange text-white'>Like</button> : <button onClick={handleUpdateFavoriteStatus}  className='text-sm flex-auto border-2 rounded-2xl mr-2'>Like</button>}

                        {isRead ? <button onClick={handleUpdateReadStatus} className='text-sm flex-auto border-2 border-orange rounded-2xl ml-2 bg-orange text-white'>Read</button> : <button onClick={handleUpdateReadStatus}  className='text-sm flex-auto border-2 rounded-2xl ml-2'>Read</button>}
                    </div>
                </div>

  )
}

Card.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,  
      cover: PropTypes.string.isRequired,
      read: PropTypes.bool.isRequired,
      favorite: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      nrOfVolumes: PropTypes.number.isRequired,
      // Add other properties as needed and their respective PropTypes
    }).isRequired,
  };
