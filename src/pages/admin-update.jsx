import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { API } from '../apiconfig';

const Data = {
    username: "",
    phone: "",
    message: "",
};

export const AdminUpdate = () => {
    const [data, setdata] = useState(
        Data
    );

    const params = useParams()
    const { authorization} = useAuth()


    const getsingleUser = async () => {

        try {
            const response = await fetch(`${API}/api/admin/user/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorization,
                }
            });

            const data = await response.json();
            console.log(`users single data ${data}`);
            setdata(data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getsingleUser();
    }, []);       //[]--taki ek hi bar chale


    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    //update data dynamically
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent from automatic page reload
        try {
            const response = await fetch(`${API}/api/admin/user/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type":"application/json",
                    Authorization : authorization,
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast.success("Updated Successfully" ,{
                    autoClose: 2000,
                    closeOnClick: true,
                  });
            }
            else {
                toast.error("Not Updated")
            }

        } catch (error) {
            console.error(error);
        }
    };



    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading">Update User Data</h1>
                </div>
                {/* Contact page main */}
                <div className="container grid grid-two-cols">


                    {/* Contact form content actual */}
                    <section className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="off"
                                    value={data.username}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="phone">Phone No.</label>
                                <input
                                    type="phone"
                                    name="phone"
                                    id="phone"
                                    autoComplete="off"
                                    value={data.phone}
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="off"
                                    value={data.email}
                                    onChange={handleInput}
                                    required
                                />
                            </div>


                            <div>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </section>
                </div>



            </section>
        </>
    );
};
