// import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";

export const Form = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [cover, setCover] = useState('');
  const [nrOfVolumes, setNrOfVolumes] = useState('');
  const [createdId, setCreatedId] = useState(null);

  const handleForm = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`http://localhost:3000/api/mangas/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title, author: author, cover: cover, nrOfVolumes: nrOfVolumes, read: false, favorite: false  }), 
      });

      const responseData = await response.json();
      const { data: { id } } = responseData; // Extract the ID from the response
      setCreatedId(id);

      if (!response.ok) {
        throw new Error('Manga added with GREAT SUCCESS');
      }

    } catch (error) {
      // Handle error
      console.error('Error adding manga:', error);
    }
  };

  return (
    <div>
        <div className='w-full flex flex-row mb-5'>
            <h1 className="text-xl text-black font-display">Manga Details</h1>
        </div>
        <div className='w-full flex flex-wrap flex-row'>
           <form className="w-1/2 flex flex-col" onSubmit={handleForm}>
              <label htmlFor="title" className="text-xl font-mont mb-2">Title</label>
              <input type="text" name="title" id="title" className="border-2 border-black rounded-lg px-2 py-1 mb-5" value={title} onChange={(event) => setTitle(event.target.value)} />
              <label htmlFor="author" className="text-xl font-mont mb-2">Author</label>
              <input type="text" name="author" id="author" className="border-2 border-black rounded-lg px-2 py-1 mb-5" value={author} onChange={(event) => setAuthor(event.target.value)} />
              <label htmlFor="cover" className="text-xl font-mont mb-2">Cover (preferably an image link from Amazon)</label>
              <input type="text" name="cover" id="cover" className="border-2 border-black rounded-lg px-2 py-1 mb-5" value={cover} onChange={(event) => setCover(event.target.value)} />
              <label htmlFor="nrVolumes" className="text-xl font-mont mb-2"># of Volumes</label>
              <input type="number" name="nrVolumes" id="nrVolumes" className="border-2 border-black rounded-lg px-2 py-1 mb-5" value={nrOfVolumes} onChange={(event) => setNrOfVolumes(event.target.value)} />
              <input type="submit" value="Submit"/>
              <Link to={`/attrGenres/${createdId}`}>
                Add Genres to Manga
              </Link>
              {createdId && (
                <p>
                  {createdId}
                </p>
              )}
           </form>
        </div> 
    </div>
  )
}
