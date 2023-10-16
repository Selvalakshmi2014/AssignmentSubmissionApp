import { useEffect, useState } from "react";

function useLocalState(defaultValue, key){
    const [value,setValue] = useState(()=>{
    const localStateValue = localStorage.getItem(key);
    return localStateValue !== null? JSON.parse(localStateValue):defaultValue;
    });
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value));
    },[key,value]);
    return [value,setValue];
}

export default useLocalState;