import './App.css';

function App() {

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
  });
  return (
    <div className="App">
     <h1> Hello World!!!</h1>
    </div>
  );
}

export default App;
