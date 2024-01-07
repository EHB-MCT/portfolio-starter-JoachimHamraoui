import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const MangaGenres = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genreList, setGenreList] = useState([]);
  const [addedGenres, setAddedGenres] = useState([])

  const handleGenres = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`http://localhost:3000/api/mangas/attrGenre`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mangaId: id, genres: addedGenres }), 
      });

      if (!response.ok) {
        throw new Error('Attributed genres to manga');
      }

    } catch (error) {
      // Handle error
      console.error('Error adding genres to manga:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`http://localhost:3000/api/mangas/${id}`);
        
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
  }, [id]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setAddedGenres((prevGenres) => [...prevGenres, value]);
    } else {
      setAddedGenres((prevGenres) => prevGenres.filter((genreId) => genreId !== value));
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return null; // You might render a placeholder or loading state here
  }

  console.log(addedGenres)

  return (
    <div className="w-1/2">
    <h2 className="text-xl font-display text-black">Add Genres to <span className="text-orange">{data.title}</span> </h2>
      <form className="w-full flex flex-row flex-wrap" onSubmit={handleGenres}>
      {genreList.map((genre, index) => (
        <div className="w-1/2" key={index}>
          <input type="checkbox" id={genre.id} value={genre.id} onChange={handleCheckboxChange} checked={addedGenres.includes(String(genre.id))} />
          <label htmlFor={genre.id}> {genre.name} </label>
          </div>
        ))}
        <input type="submit" value='Add Genres' className="mt-3 bg-orange text-white px-3 py-0.5 rounded-2xl"></input>
      </form>
    </div>
    
  )
}

{/* <div>Attribute a genre to {data.title} </div>
      {genreList.map((genre, index) => (
                      <p key={index}>{genre.name}</p>
                    ))} */}
