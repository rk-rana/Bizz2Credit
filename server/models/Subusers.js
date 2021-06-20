import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const subUserSchema = new  Schema({

    creater : {
        type : String,

    },

    name:{
        type: String,
        required: true
    },
password:{
    type: String,
    required: true
},
email:{
    type:String,
    required: true
},
phone_number:{
    type:Number,
    required: true
}
})

const Subuser = mongoose.model('Subuser', subUserSchema)

export default Subuser;
