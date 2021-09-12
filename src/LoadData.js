import {useEffect, useState } from 'react';
import './App.css';
//import LoadPageData from './LoadPageData';
import LoadPageDataStatic from './LoadPageDataStatic';


function LoadData() {
    const [data,setData]=useState([]);
    const getData=()=>{
      
        fetch('status.json'
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
        });
    }
    useEffect(()=>{
      
      getData();
  
    },[])
    while(data===[])
    {
      return (
        <div>
              
          STILL LOADING
        
        </div>
      );
    };
      console.log("This is PageID array", data);
      return (
              
          <LoadPageDataStatic pageID = {data} />
                
      );
}
  

  
  export default LoadData;