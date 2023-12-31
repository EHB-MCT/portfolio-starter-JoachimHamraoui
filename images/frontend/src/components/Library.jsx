// import React from 'react'
import { useState, useEffect } from 'react';
import { Card } from './Card';

export const Library = () => {
    
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');
    const [genreList, setGenreList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
    
          try {
            const response = await fetch(`http://localhost:3000/api/mangas/${filter}`);
            
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
    
            const result = await response.json();
            setData(result);
          } catch (error) {
            setError(error.message);
          } finally {
            setIsLoading(false);
          }
        };

        const fetchGenres = async () => {

    
          try {
            const response = await fetch(`http://localhost:3000/api/genres`);
            
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
    
            const result = await response.json();
            setGenreList(result);
          } catch (error) {
            console.log(error.message);
          }
        };
    
        fetchData();
        fetchGenres();
      }, [filter]);

      const allMangas = () => {
        setFilter(' ');
      }

      const readMangas = () => {
        setFilter('read')
      }

      const favoriteMangas = () => {
        setFilter('favorites')
      }

      const genreFilter = (event) => {
        setFilter(event.target.value);
        console.log('Selected genre:', event.target.value);
        console.log(filter)
      }
 
      console.log(filter)

      if (isLoading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>Error: {error}</p>;
      }
    
      if (!data) {
        return null; // You might render a placeholder or loading state here
      }

  return (
    <div>
        <div className='w-full flex flex-row mb-5'>
            {/* <h2 className="text-black text-2xl font-mont">Library</h2> */}
            <div className='w- flex flex-row ml-2'>
                <button className='flex-auto flex border-2 rounded-2xl mr-4 duration-300 transition-bg transition-text hover:text-white hover:bg-black border-black px-5 py-0.5' onClick={allMangas}>All</button>
                <button className='flex-auto flex border-2 rounded-2xl mr-4 duration-300 transition-bg transition-text hover:text-white hover:bg-black border-black px-5 py-0.5' onClick={readMangas}>Read</button>
                <button className='flex-auto flex border-2 rounded-2xl mr-4 duration-300 transition-bg transition-text hover:text-white hover:bg-black border-black px-5 py-0.5' onClick={favoriteMangas}>Favorites</button>
                  <select value={filter} onChange={genreFilter} className='flex-auto flex border-2 rounded-2xl mr-4 border-black px-3 py-0.5'>
                    <option value=" ">All</option>
                    {genreList.map((genre, index) => (
                      <option key={index} value={`genre/${genre.name}`}>{genre.name}</option>
                    ))}
                  </select>
            </div>
        </div>
        <div className='w-full flex flex-wrap flex-row'>
            {data.map((item, index) => (
                <Card key={index} item={item} />
            ) )}
        </div> 
    </div>
  )
}
