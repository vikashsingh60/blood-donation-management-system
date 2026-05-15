import { useState } from "react";
import axios from "axios";

const EmergencyRequest = () => {

const [formData, setFormData] =
useState({

patientName: "",
bloodGroup: "",
unitsNeeded: "",
location: ""

});

const handleChange = (e) => {

setFormData({

...formData,

[e.target.name]:
e.target.value

});

};

const handleSubmit =
async (e) => {

e.preventDefault();

const res =
await axios.post(

"http://localhost:5000/api/request/create",

formData

);

alert(
`Request Created:
${res.data.request.requestId}`
);

};

return (

<div className="
min-h-screen
flex
items-center
justify-center
bg-red-50
p-5
">

<form
onSubmit={handleSubmit}
className="
bg-white
shadow-xl
rounded-2xl
p-8
w-full
max-w-lg
space-y-4
"
>

<h1 className="
text-3xl
font-bold
text-red-600
text-center
">

Emergency Blood Request

</h1>

<input
type="text"
name="patientName"
placeholder="Patient Name"
className="
w-full
border
p-4
rounded-xl
"
onChange={handleChange}
/>

<input
type="text"
name="bloodGroup"
placeholder="Blood Group"
className="
w-full
border
p-4
rounded-xl
"
onChange={handleChange}
/>

<input
type="number"
name="unitsNeeded"
placeholder="Units Needed"
className="
w-full
border
p-4
rounded-xl
"
onChange={handleChange}
/>

<input
type="text"
name="location"
placeholder="Location"
className="
w-full
border
p-4
rounded-xl
"
onChange={handleChange}
/>

<button
className="
w-full
bg-red-600
text-white
p-4
rounded-xl
"
>

Request Blood

</button>

</form>

</div>

);

};

export default EmergencyRequest;