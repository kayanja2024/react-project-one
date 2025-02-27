import React from 'react'
import ItemList from './ItemList';
const Content = ({ items, handleCheck, handleDelete }) => {
    
        // const [count, setCount ] = useState(0);
        // const handleNameChange = ()=>{
        //     const names = ['paul','musa','isa','peter']
        //     const int = Math.floor(Math.random()*3)
        //     setName(names[int]);
        // }
        // const handleClick = ()=>{
        //     setCount(count + 1)
        //     setCount(count + 1)
        //     console.log(count)
        // }

        // const handleClick2 = ()=>{
        //     console.log(count)

        // }
    return (
        <>
            {items.length ? (
                
                <ItemList 
                  items={items}
                  handleCheck={handleCheck}
                  handleDelete={handleDelete}
                />
            ) : (
                <p style={{marginTop: '2rem', textAlign: 'center' }}> Your list is empty. </p>
            )}             
        </>
        )
}

export default Content