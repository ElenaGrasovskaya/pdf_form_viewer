import {useEffect, useState } from 'react';
import './App.css';
import PdfViewerComponent from './PdfViewerComponent';



function LoadPageDataStatic(props) {
    const [data,setData]=useState([]);
    let pageID = props.pageID;

    
    console.log("Pages INFO", pageID.pages);

    const getData=()=>{
      fetch(`pageInfo_R208.json`
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
        <div className="App">
       Still Loading        
        </div>
      );
    }
    if(data!==[]) {
     console.log("This is page data for the new page", data) 
    return (
      <div className="PDF-viewer">
			<PdfViewerComponent
				document={"NewPage.pdf"}
        pageData = {data}
            />
		  </div>
      
    );
  }

  }
  
  export default LoadPageDataStatic;