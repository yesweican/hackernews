import React, {Component} from 'react';
import './App.css';

 const DEFAULT_QUERY = 'redux';
 const PATH_BASE = 'https://hn.algolia.com/api/v1';
 const PATH_SEARCH = '/search';
 const PARAM_SEARCH = 'query=';

 function isSearched(searchTerm)
 {
   return function(item){return item.title.toLowerCase().includes(searchTerm.toLowerCase())};
 }

class App extends Component 
{
 
  constructor(props)
  {
    super(props);

    this.state={ result: null, searchTerm: DEFAULT_QUERY, };    



    //these were needed
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this); 
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    //no effect?????
    this.onDismiss = this.onDismiss.bind(this);
  }

  fetchSearchTopStories(searchTerm)
  {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response=>response.json())
    .then(result=>this.setSearchTopStories(result))
    .catch(error=>error);   
  }

  componentDidMount()
  {
    const {searchTerm} = this.state;

    this.fetchSearchTopStories(searchTerm);
  }

  render()
  {
    const {searchTerm, result } = this.state;

    return (
    <div className="App">
      <Search  value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
        Search
      </Search>
    {
      result ?
          <Table  list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss}>
            Data Table
          </Table>
          :
          null
    }

    </div>
    );  
  }

  setSearchTopStories(result)
  {
    console.log(result);    
    this.setState({ result });
  }

  onSearchChange(event)
  {
    console.log(event.target.value);
    this.setState({searchTerm: event.target.value});
  }

  onSearchSubmit()
  {
    console.log(this.state.searchTerm);
    const {searchTerm} = this.state;
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`;
    fetch(url)
    .then(response=>response.json())
    .then(result=>this.setSearchTopStories(result))
    .catch(error=>error);
  }

  onDismiss(id)
  {
    console.log(this);

    //const updatedHits = this.state.result.hits.filter(item=>item.objectID!==id);
    //this.setState( {result: {...this.state.result, hits:updatedHits} });
    const updatedHits = this.state.list.filter(item=>item.objectID!==id);
    this.setState( { list:updatedHits});
  }

}

class Search extends Component
{
  render() {
    const { value, onChange, onSubmit } = this.props;
    return (
      <div>
      <input type="text" value={value} onChange={onChange} ></input>
      <button onClick={onSubmit}>Submit</button>
      </div>     
    );
  }
}

class Table extends Component
{
  render()
  {
    const { list, pattern, onDismiss } = this.props;

    return (
      <div>
        {
          list.filter(isSearched(pattern)).map(item=>
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
          )
        }
      </div>
    )
  }
}

export default App;
