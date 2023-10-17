import { useEffect, useState } from "react";
import useLocalState from "../util/useLocalStorage";
import Ajax from "../services/fetchService";
import ajax from "../services/fetchService";

const AssignmentView = () =>{
    const assignmentId = window.location.href.split('/assignments/')[1];
    const[jwt,setJwt] = useLocalState("","jwt");
    const[assignment,setAssignment] = useState({
        githubUrl : "",
        branch :""
    });
   
    
    const updateAssignment = (prop,value) => {
        const newAssignment = {...assignment};
        newAssignment[prop] = value;
        setAssignment(newAssignment);
        console.log("Inside Assignment View::  "+assignment);
    }
    function save(){
        
        ajax('/api/assignments/'+assignmentId,"put",jwt,assignment)
        .then((assignmentData) => {
            setAssignment(assignmentData);
        });
    }
    
    useEffect(() => {
        ajax('/api/assignments/'+assignmentId,"GET",jwt)
        .then((assignmentData) => {
            if(assignmentData.branch === null) assignmentData.branch = "";
            if(assignmentData.githubUrl === null) assignmentData.githubUrl = "";
            setAssignment(assignmentData);
        }
        )
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

                    value={assignment.githubUrl}
                    /></h3>
                <h3>Branch : 
                    <input type="text" id="branch" 
                    onChange={(e) =>{
                  updateAssignment("branch",e.target.value)  
                 }}
                 value={assignment.branch}/></h3>
                <button onClick={()=>save()}>Submit Assignment</button>
                </> ): <></>
            }
        </div>
    );
}

export default AssignmentView;