
import mongoose,{Schema,model} from 'mongoose'

const sentEmailSchema = new Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    receipent:{
        type:String,
        required:true
    },
    subject:{
        type:String 
    },
    body:{
        type:String 
    }
},
    {
        timestamps:true 
    }
)

export const SentEmail = model('SentEmail', sentEmailSchema);  