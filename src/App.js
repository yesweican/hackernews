import React, {Component} from 'react';
import './App.css';

 const DEFAULT_QUERY = 'redux';
 const PATH_BASE = 'https://hn.algolia.com/api/v1';
 const PARAM_SEARCH = '/search';
 const PARAM_QUERY = 'query=';

class App extends Component 
{
  constructor(props)
  {
    super(props);
    this.state={
      searchTerm: DEFAULT_QUERY,
      list: [],
    };

    //no effect?????
    this.onDismiss = this.onDismiss.bind(this);

    //these were needed
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);


  }

  // componentDidMount()
  // {
  //   const {searchTerm} = this.state;

  //    fetch(`${PATH_BASE}${PARAM_SEARCH}?${PARAM_QUERY}${searchTerm}`)
  //   .then(response=>response.json())
  //   .then(result=>this.setSearchTopStories(result))
  //   .catch(error=>error);   
  // }

  render()
  {
    const {searchTerm, list } = this.state;

    if(!list)
      return null;

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

  setSearchTopStories(result)
  {
    this.setState({ list: result.hits });
  }

  onSearchChange(event)
  {
    this.setState({searchTerm: event.target.value});
  }

  onSearchSubmit()
  {
    alert(this.state.searchTerm);
    const {searchTerm} = this.state;
    const url = `${PATH_BASE}${PARAM_SEARCH}?${PARAM_QUERY}${searchTerm}`;
    fetch(url)
    .then(response=>response.json())
    .then(result=>this.setSearchTopStories(result))
    .catch(error=>error);
  }

  onDismiss(id)
  {
    console.log(this);

    //const updatedHits = this.state.results.hits.filter(item=>item.objectID!==id);
    //this.setState( {results: {...this.state.result, hits:updatedHits} });
    const updatedHits = this.state.list.filter(item=>item.objectID!==id);
    this.setState( { list:updatedHits});
  }

}

export default App;
