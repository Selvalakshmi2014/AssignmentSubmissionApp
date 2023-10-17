import React, { useEffect, useState } from 'react'
import useLocalState from "../util/useLocalStorage";
import { Link } from 'react-router-dom';
import ajax from '../services/fetchService';


function Dashboard(){
    const [jwt,setJwt] = useLocalState("","jwt");
    const [assignments,setAssignments] = useState(null);

    useEffect(() =>{
        ajax('api/assignments',"GET",jwt)
        .then((assignmentsData) =>{
                setAssignments(assignmentsData);
            })

    },[]);

    function createAssignment(){
        ajax('api/assignments',"POST",jwt)
         .then((data) => {
            console.log("Inside Create Assignment:  " +data);
            window.location.href = '/assignments/'+data.id;
        }
        ).catch((message) =>{
            alert(message);
            window.location.href = '/login';
        });
    }
    return(
        <div style={{margin : "2em"}}>
            {assignments ? assignments.map((assignment) => <div key={assignment.id}>
               <Link to={'assignments/'+assignment.id}> Assignment ID : {assignment.id}</Link>
            </div>) : <></>}
            <button type="submit" onClick = {() => createAssignment()}>Submit New Assignment</button>
        </div>

    );
}

export default Dashboard;