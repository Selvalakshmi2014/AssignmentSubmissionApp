import useLocalState from "../util/useLocalStorage";

function ajax(url,reqMethod,jwt,reqBody){
const fetchData = {
    headers:{
        "Content-Type" : "Application/json"
    },
    method : reqMethod
    }
    if(jwt){
        fetchData.headers.AUTHORIZATION = 'Bearer '+jwt;
    }
    if(reqBody){
        fetchData.body = JSON.stringify(reqBody);
    }

    //const [jwt,setJwt] = useLocalState("","jwt");
    return fetch(url,fetchData).then(response => {
        if(response.status === 200) return response.json();
    })
}

export default ajax;