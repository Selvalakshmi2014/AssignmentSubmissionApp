import React, { useEffect, useState } from 'react'
import useLocalState from "../util/useLocalStorage";
import { Link } from 'react-router-dom';


function Dashboard(){
    const [jwt,setJwt] = useLocalState("","jwt");
    const [assignments,setAssignments] = useState(null);

    useEffect(() =>{
        fetch('api/assignments',{
            headers :{
            'Content-Type':"application/json",
            AUTHORIZATION:'Bearer '+jwt
            },
            method :"GET"
            }).then((response) =>{
                if(response.status === 200) return response.json();
            }).then((assignmentsData) =>{
                setAssignments(assignmentsData);
            })

    },[]);

    function createAssignment(){
         fetch('api/assignments',{
            headers : {
                "Content-Type" : "application/json",
                AUTHORIZATION : 'Bearer '+jwt,
            },
            
            method : "POST"
        }).then((response) => {
            if(response.status === 200) return response.json();
            else
            return Promise.reject("User not Authorized");
        }).then((data) => {
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
            {assignments ? assignments.map((assignment) => <div>
               <Link to={'assignments/'+assignment.id}> Assignment ID : {assignment.id}</Link>
            </div>) : <></>}
            <button type="submit" onClick = {() => createAssignment()}>Submit New Assignment</button>
        </div>

    );
}

export default Dashboard;