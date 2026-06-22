import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res) => {
    //1. get user details from frontend 
    const {fullName , email ,username ,password}  = req.body
    console.log("email : ",email)

    //2. validate data 
    // if(fullName === ""){
    //     throw new ApiError(400,"fullname is required")
    // }

    if(
        [fullName,email,username,password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400,"all fields are required ")
    }

    //3. check if user already exists 
    const existingUser =  User.findOne({
        $or:[{username},{email}]
    })

    if(existingUser){
        throw new ApiError(409,"User with username and email already exists.")
    }

    //4. check for avatar and cover image -- avattar is must 
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath =  req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required ")
    }

    //5. upload to cloudinary 
    const avatar =  await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required ")
    }

    //6. create user object and create entry in Database
    const user = await User.create({
        fullName,
        avatar:avatar.secure_url,
        coverImage:coverImage?.secure_url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    //7. remove password and refresh token field from response 
   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )

   //8. check if user is created in db or not 
   if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering a user ")
   }

   //9. return the response 
   return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered successfully")
   )
    
})

export  {
    registerUser,
}