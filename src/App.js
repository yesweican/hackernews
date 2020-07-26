import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const list=[
    {
      title:'React',
      url: 'https://reactjs.org',
      author:'jordan walke',
      num_comments:3,
      points:4,
      objectID:0
    },
    {
      title:'Redux',
      url: 'https://redux.js.org',
      author:'Dan Abramov, Andrew Clark',
      num_comments:2,
      points:5,
      objectID:1     
    }
  ];
  return (
    <div className="App">
      <header className="App-header">
         <img src={logo} alt="Logo" width="90" height="90" />

      {
        list.map(function(item){
          return(
          <div>            
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </div>            
          );
        })}
    </header>    
    </div>

  );

}

export default App;
