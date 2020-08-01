import React, {Component} from 'react';
import './App.css';

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

 const DEFAULT_QUERY = 'redux';
 const PATH_BASE = 'https://hn.algolia.comapi/v1';
 const PATH_SEARCH = '/search';
 const PARAM_QUERY = 'query=';

class App extends Component 
{
  constructor(props)
  {
    super(props);
    this.state={
      searchTerm:'',
      list: list,
    };

    //no effect?????
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  render()
  {
    return (
    <div className="App">
      <form>
            <input type="text" onChange={this.onSearchChange}/>
            <button onClick={this.onSearchSubmit}>Submit</button>
      </form>    
      {
        this.state.list.map(item=>
          <div key={item.objectID}>            
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button 
              onClick={()=>{this.onDismiss(item.objectID)}} 
              type="button"
              >
                Dismiss
              </button>
            </span>
          </div>            
        )}
    </div>
    );  
  }

  onSearchChange(event)
  {
    this.setState({searchTerm: event.target.value});
  }

  onSearchSubmit()
  {
    alert(this.state.searchTerm);
  }

  onDismiss(id)
  {
    console.log(this);

    const updateList = this.state.list.filter(item=>item.objectID!==id);
    this.setState( {list: updateList} );
  }

}

export default App;
