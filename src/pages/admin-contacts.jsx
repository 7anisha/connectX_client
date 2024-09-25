import { useEffect, useState } from "react";
import { useAuth } from "../store/auth"
import {Link} from "react-router-dom";
import { API } from '../apiconfig';

export const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);

    const { authorization } = useAuth();  //fetch kr rhe h auth.jsx se

    const getAllContacts = async () => {
        try {
            const response = await fetch(`${API}/api/admin/contact`, {
                method: "GET",
                headers: {
                    Authorization: authorization
                }
            });         // response= same jaisa postman me kra

            const data = await response.json();  //data = object fromat me response tha usko json me
            console.log(`contacts ${data}`);

            setContacts(data)

        } catch (error) {
            console.log(error)
        }
    };

    const deleteContact = async (id)=>{

        try{
        const response = await fetch(`${API}/api/admin/contact/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: authorization,
            }
        }); 

        const data = await response.json();  
        console.log(`contact after delete ${data}`);

        if(response.ok){
            getAllContacts();
        }
    }catch(error){
        console.log(error);
    }
    };

    useEffect(() => {
        getAllContacts();
    }, []);    



    return (
        <>
            <section className="admin-users-section">
                <div className="container ad">
                    <h1>
                        Admin Contacts Data
                    </h1>
                </div>
                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Delete</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((curUser, index) => {
                                return <tr key={index}>
                                    <td>{curUser.username}</td>
                                    <td>{curUser.email}</td>
                                    <td style={{ width: '100px' }}>{curUser.message}</td>
                                    <td>
                                    <button onClick={()=> deleteContact(curUser._id)}> Delete</button>
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