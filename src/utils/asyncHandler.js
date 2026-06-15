import { Promise } from "mongoose"

const asyncHandler = (requesthendler) => {
    (req,res,next) => {
        Promise.resolve(requesthendler(req,res,next)).catch((err) => next(err))
    }
 }

export {asyncHandler}








/*
// const asyncHandler = ( ) => { () => {}}  -- function ke andar function 
const asyncHandler = () => async(req,res,next) => {
    try {
        await fn(req,res,next);
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}
*/
