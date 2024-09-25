import { useEffect, useState } from "react";
import { useAuth } from "../store/auth"
import {Link} from "react-router-dom";
import { API } from '../apiconfig';
export const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    const { authorization} = useAuth();  //fetch kr rhe h auth.jsx se

    const getAllUser = async () => {
        try {
            const response = await fetch(`${API}/api/admin/user`, {
                method: "GET",
                headers: {
                    Authorization: authorization
                }
            });         // response= same jaisa postman me kra

            const data = await response.json();  //data = object fromat me response tha usko json me
            console.log(`users ${data}`);

            setUsers(data)

        } catch (error) {
            console.log(error)
        }
    };

    const deleteUser = async (id)=>{

        try{
        const response = await fetch(`${API}/api/admin/user/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: authorization,
            }
        }); 

        const data = await response.json();  
        console.log(`users after delete ${data}`);

        if(response.ok){
            getAllUser();
        }
    }catch(error){
        console.log(error);
    }
    };

    useEffect(() => {
        getAllUser();
    }, []);       //[]--taki ek hi bar chale

    return (
        <>
            <section className="admin-users-section">
                <div className="container ad">
                    <h1>
                        Admin Users Data
                    </h1>
                </div>
                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((curUser, index) => {
                                return <tr key={index}>
                                    <td>{curUser.username}</td>
                                    <td>{curUser.email}</td>
                                    <td>{curUser.phone}</td>
                                    <td><Link to ={`/admin/users/${curUser._id}/edit`}>Edit</Link></td>
                                    <td>
                                        <button onClick={()=> deleteUser(curUser._id)}> Delete</button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

            </section>
        </>
    )
}