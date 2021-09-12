import {useEffect, useState } from 'react';
import './App.css';


function LoadPageData(props) {
    const [data,setData]=useState([]);
    const allPagesData = [];
    const getData=(page)=>{
      fetch(`pageInfo_${page}.json`
      ,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }
      )
        .then(function(response){
          return response.json();
        })
        .then(function(myJson) {
          setData(myJson)
          console.log("This is data", data);
        });
        allPagesData.push(data);
    }
    
    
    useEffect(()=>{
      props.pageID.forEach(element => console.log(" props.pageID.forEach" ,element));
      props.pageID.forEach(element => getData(element));
    },[])

    console.log("All Pages data", allPagesData)

    while(data)
    {
      return (
        <div className="App">
       Still Loading        
        </div>
      );
    }

    return (
      <div className="App">
     
        Loaded
        {console.log("All Pages data", allPagesData)}       
      
      </div>
    );

  }
  
  export default LoadPageData;