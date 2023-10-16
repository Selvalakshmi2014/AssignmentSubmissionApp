import { useEffect, useState } from "react";
import useLocalState from "../util/useLocalStorage";

const AssignmentView = () =>{
    const assignmentId = window.location.href.split('/assignments/')[1];
    const[jwt,setJwt] = useLocalState("","jwt");
    const[assignment,setAssignment] = useState(null);
    const[branch,setBranch] = useState("");
    
    const updateAssignment = (prop,value) => {
        assignment[prop] = value;
        console.log(assignment);
    }
    function save(){
        fetch('/api/assignments/'+assignmentId,{
            headers :{
                "Content-Type":"application/json",
                AUTHORIZATION : 'Bearer '+jwt
            },
            method : "put",
            body : JSON.stringify(assignment)
        }).then(response => {
            if(response.status === 200) return response.json();
        }).then((assignmentData) => {
            setAssignment(assignmentData);
        });
    }
    
    useEffect(() => {
        fetch('/api/assignments/'+assignmentId,{
            headers : {
                "Content-Type" : "application/json",
                AUTHORIZATION : 'Bearer '+jwt,
            },
            
            method : "GET"
        }).then((response) => {
            if(response.status === 200) return response.json();
            else
            return Promise.reject("User not Authorized");
        }).then((assignmentData) => {
            setAssignment(assignmentData);
        }
        ).catch((message) =>{
            alert(message);
        });
    },[]);
    return(
        <div>
            <h1>Assignment {assignmentId}</h1>
            {
                assignment?(<>
                <h1>Status : {assignment.status}</h1>
                <h3>Git Hub URL : 
                    <input type="url" id="githubUrl" 
                    onChange={(e) =>{
                    updateAssignment("githubUrl",e.target.value)}}
                    /></h3>
                <h3>Branch : 
                    <input type="text" id="branch" 
                    onChange={(e) =>{
                  updateAssignment("branch",e.target.value)  
                 }}/></h3>
                <button onClick={()=>save()}>Submit Assignment</button>
                </> ): <></>
            }
        </div>
    );
}

export default AssignmentView;