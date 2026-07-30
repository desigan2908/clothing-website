import "./Profile.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {

const navigate=useNavigate();

const {
user,
logout,
updateProfile
}=useAuth();

const [editing,setEditing]=useState(false);

const [form,setForm]=useState({

name:user?.name||"",
email:user?.email||"",
phone:user?.phone||"",
address:user?.address||""

});

const handleChange=(e)=>{

setForm({

...form,
[e.target.name]:e.target.value

});

};

const saveProfile=()=>{

updateProfile(form);

setEditing(false);

alert("Profile Updated");

};

return(

<>

<Navbar/>

<div className="profile">

<div className="profile-card">

<h1>My Profile</h1>

<label>Name</label>

<input
name="name"
value={form.name}
disabled={!editing}
onChange={handleChange}
/>

<label>Email</label>

<input
name="email"
value={form.email}
disabled
/>

<label>Phone</label>

<input
name="phone"
value={form.phone}
disabled={!editing}
onChange={handleChange}
/>

<label>Address</label>

<textarea
name="address"
value={form.address}
disabled={!editing}
onChange={handleChange}
/>

<div className="buttons">

{editing ? (

<button
onClick={saveProfile}
>

Save

</button>

):(

<button
onClick={()=>setEditing(true)}
>

Edit Profile

</button>

)}

<button
className="logout"
onClick={()=>{

logout();

navigate("/login");

}}
>

Logout

</button>

</div>

</div>

</div>

<Footer/>

</>

);

}