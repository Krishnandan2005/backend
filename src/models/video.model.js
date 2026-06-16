import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
    videoFile:{
        type:String, // cloudnary url
        required:true,
    },
    thumbnail:{   // loudnary url
        type:String,
        required:true,
    },
    owner:[
        {type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    title:{
        type:String,
        required:true,
        uppercase:true,
    },
    duration:{
        type:Number,  // cloudnary
        required:true,
    },
    views:{
        type:Number,
        default:0,
    },
    isPublished:{
        type:Boolean,
        default:true,
    }
},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema);