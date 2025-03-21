// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';
// import { BiColor } from 'react-icons/bi';
// const [isLoading, setIsLoading] = useState(true);


function App() {
  const API_URL = 'http://localhost:3500/items';

  const [items, setItems ] = useState([]);
  // JSON.parse(localStorage.getItem('shoppinglist')) || []
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);



  useEffect(() => {
    // setItems(JSON.parse(localStorage.getItem('shoppinglist')))
    // localStorage.setItem('shoppinglist',JSON.stringify(items));
    const fetchItems = async () => {
      try 
      {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('did not recieve expected data');        
        const listItems = await response.json();
        // console.log(listItems);
        setItems(listItems);
        setFetchError(null);

      } catch (err) {
        setFetchError(err.message);
        
      }
      // finally{
      //   setIsLoading(false);
      // }
    }
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000)
    // (async () => await fetchItems())();
  },[])


  // const setAndSaveItems = (newItems) => {
  //   setItems(newItems);
    // localStorage.setItem('shoppinglist',JSON.stringify(newItems));

  // }



  const addItem = async (item) => {
    const id = items.length ? items[items.length -1].id + 1 : 1;
    const myNewItem = {id, checked:false, item};
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if(result) setFetchError(result);
  }  

  
  const handleCheck = async (id) =>{
    // console.log(`key: ${id}`)
    // const listItem = [...items]
    const listItems = items.map((item) => item.id === id ? {
      ...item,checked: !item.checked
    } :item);
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id=== id);
    const updateOptions = {
      method: 'PATCH',
      Header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked})
    };
    // setItems(listItems);
    // localStorage.setItem('shoppinglist', JSON.stringify(listItems));

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if(result) setFetchError(result);

  }

  const handleDelete = async (id) => {
    // console.log(id)
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    // setItems(listItems);
    // localStorage.setItem('shoppinglist',JSON.stringify(listItems));

    const deleteOptions = {method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if(result) setFetchError(result);

  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");

  }
  return (
    <div className="App">
      <Header title= "Grocery List" />
      
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit} 
      
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {/* {isLoading && <p>Loading Items.....</p>} */}
        {fetchError && <p style={{color : "red", textAlign : "center"}}>{`error: ${fetchError}`}</p>}
        
        {!fetchError &&<Content 
          items={items.filter(item => ((item.item).toLowerCase()).includes
          (search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          
        />}
      </main>
      <Footer length={items.length }/>
      
      
    </div>
  );
}

export default App;
