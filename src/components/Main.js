import React, { useState } from 'react';

const Main = () => {
  const [text, setText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Text submitted: ${text}`);
    setText("");
  };

  return (
    <div style={{"height": "500px"}}>
      <h1>Law App</h1>
      <p>Search for a case below.</p>
      <form action="#" method="get" onSubmit={handleSubmit}>
        <label htmlFor="case_search">
          <input type="text" name="case_search" id="case_search"
          onChange={(e) => setText(e.target.value)} value={text} autoComplete="off"
          />
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  )
};

export default Main