import { useEffect } from 'react';
import './App.css';

function App() {
console.log("Hello");

useEffect(()=>{
  const reqBody = {
    username:"selva",
    password:"selva"
  }
  fetch('api/auth/login',{
    headers:{
      "Content-Type":"application/json"
    },
    method:"post",
    body:JSON.stringify(reqBody),
  }).then((response)=> { return Promise.all([response.json(),response.headers]
    )})
    .then(([body,headers]) => {
      console.log("Header :  "+headers.get("authorization"));
      console.log(body);
    });

},[]);
  
  return (
    <div className="App">
     <h1> Hello World!!!</h1>
    </div>
  );
}

export default App;
