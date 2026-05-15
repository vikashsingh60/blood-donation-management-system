import mongoose from "mongoose";

const requestSchema =
new mongoose.Schema(

{

patient: {

type: mongoose.Schema.Types.ObjectId,

ref: "User"

},

patientName: {
type: String
},

requestId: {
type: String,
unique: true
},

bloodGroup: {

type: String,

required: true

},

units: {

type: Number,

required: true

},

hospital: {

type: String,

required: true

},

hospitalType: {

type: String,

enum: [

"private_hospital",

"government_hospital",

"aiims_pgi"

]

},

location: {
type: String
},

abhaNumber: {
type: String
},

emergencyPatient: {

type: Boolean,

default: false

},

priority: {

type: String,

enum: [

"normal",

"urgent",

"critical"

],

default: "normal"

},

status: {

type: String,

enum: [

"pending",

"approved",

"completed",

"rejected"

],

default: "pending"

},

donorAssigned: {

type: Boolean,

default: false

},

donor: {

type: mongoose.Schema.Types.ObjectId,

ref: "User"

}

},

{

timestamps: true

}

);

export default mongoose.model(
"Request",
requestSchema
);