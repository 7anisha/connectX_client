import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { API } from '../apiconfig';

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

export const Contact = () => {
  const [contact, setContact] = useState(
    defaultContactFormData
  );

  const [userData,setUserdata]=useState(true);
  const { user} = useAuth();

  // useEffect(() => {
    if (userData && user) {
      setContact({
        username: user.username,
        email: user.email,
        message: "",
      });
      setUserdata(false);
    }
  // }, [user]);

  // Handle input changes
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit= async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/form/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      console.log("response: ", response);
      // alert(response);

      if (response.ok) {
        setContact(defaultContactFormData);
        const responseData = await response.json();
        alert("send");
        console.log(responseData);
      } else {
        // Handle API error here
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          
        </div>
        {/* Contact page main */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="We are always ready to help" />
          </div>

          {/* Contact form content actual */}
          <section className="section-form">
          <h1 className="main-heading">Contact Us</h1>
          <br></br>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
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
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3562.266320864406!2d75.84780627521909!3d26.767779376733838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc91e898380fd%3A0xeee859ae1f1b64b0!2sPIET%20-%20Poornima%20Institute%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1715765961046!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};
