import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

const Reservation = () => {
    const[firstName,setFirstName]=useState("")
    const[lastName,setLastName]=useState("")
    const[email,setEmail]=useState("")
    const[date,setDate]=useState("")
    const[time,setTime]=useState("")
    const[ampm,setAmPm]=useState("AM")
    const[phone,setPhone]=useState(0)
    const navigate=useNavigate()

    const handleReservation = async (e) => {
        e.preventDefault();
        const fullTime = `${time} ${ampm}`;
        const formData = { firstName, lastName, email, phone, date, time: fullTime };
    
        console.log("Form Data:", formData);
    
        try {
            const response = await axios.post(
                "https://mern-0lf9.onrender.com/api/v1/reservation/send",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            
            console.log("Response Data:", response.data);
    
            if (response.data && response.data.message) {
                toast.success(response.data.message);
                setFirstName("");
                setLastName("");
                setPhone(0);
                setEmail("");
                setTime("");
                setDate("");
                setAmPm("AM");
                navigate("/success");
            } else {
                toast.error("Reservation successful, but no message received from server.");
            }
        } catch (error) {
            console.log("Error:", error);
    
            if (error.response) {
                console.log("Error Response Data:", error.response.data);
                console.log("Error Response Status:", error.response.status);
                console.log("Error Response Headers:", error.response.headers);
                toast.error(error.response.data.message || "An error occurred while making the reservation.");
            } else if (error.request) {
                console.log("Error Request Data:", error.request);
                toast.error("No response received from server.");
            } else {
                console.log("Error Message:", error.message);
                toast.error("An error occurred while making the reservation.");
            }
        }
    };
    
  return (
    <section className='reservation' id='reservation'>
      <div className="container">
        <div className="banner">
            <img src="/reservation.png" alt="res" />
        </div>
        <div className="banner">
            <div className="reservation_form_box">
                <h1>MAKE A RESERVATION</h1>
                <p>For Further Questions, Please Call</p>
                <form onSubmit={handleReservation}>
                    <div>
                        <input type="text" placeholder='First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                        <input type="text" placeholder='Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                    </div>

                    <div>
                        <input type="date" placeholder='Date' value={date} onChange={(e)=>setDate(e.target.value)} />
                        <input type="time" placeholder='time' value={time} onChange={(e)=>setTime(e.target.value)} required />
                        <select value={ampm} onChange={(e) => setAmPm(e.target.value)} required>
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                    </select>
                    </div>

                    <div>
                        <input type="email" className='email_tag' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <input type="number" placeholder='Phone' value={phone} onChange={(e)=>setPhone(e.target.value)} />
                    </div>
                    <button type='submit'>
                        RESERVE NOW{" "}
                        <span><HiOutlineArrowNarrowRight/></span>
                    </button>
                </form>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Reservation