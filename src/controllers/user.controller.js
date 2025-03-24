import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async (req, res, next) =>{

    // get user details from request body from frontend -done
    // validation - not empty -done
    // check if user already exists: username, email -done
    // check for images , check for avatar -done
    // upload them to cloudinary, avatar -done
    // create user object - create entry in db -done
    // remove password and refresh token field from response
    // check for user creation
    // return response


    const { fullName, email, username, password } = req.body
    console.log("email :", email);

    // if(fullName === "") {
    //     throw new ApiError(400, "Fullname is required")
    // }
    if(
        [fullName, email, username, password ].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUSer = await User.findOne({
        $or: [{ username } , { email }]
    })

    if(existedUSer){
        throw new ApiError(409, "User with email or username already exists")
    }
     
    console.log("req.files.avatar :", req.files.avatar);
    
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    console.log("req.files :", req.files);
    console.log("req.files.avatar[0].path :", req.files.avatar[0].path);
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    console.log("avatar :", avatar);

    if (!avatar) {
        throw new ApiError(400, "Failed to upload avatar")
    }

    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || null
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500, "Failed to create user error while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )


})

export { registerUser }