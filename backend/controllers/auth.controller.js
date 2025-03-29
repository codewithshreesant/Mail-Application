import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'  

const passwordCorrect = async (userId, password) => {
    const user = await User.findById({_id:userId});
    return user.isPasswordCorrect(password);
}

const generateToken = async (userId) => {
    const user = await User.findById({_id:userId});
    const token = user.tokenGeneration();
    return {token}
}

const registerUser = asyncHandler(
    async (req, res, next) => {
        console.log("register user ",req.body)
        const { email, password } = req.body;
        if (
            [email, password].some((field) => {
                return field === ""
            })
        ) {
            throw new ApiError(
                402,
                "email and password is required!"
            )
        }

        const existingUser = await User.findOne({
            email
        })
       console.log("existing user ", existingUser)
        if (existingUser) {
            return res.status(402).json({ message: "User already exist" })
        }

        const newUser = await User.create({
            email,
            password
        })

        const user = await newUser.save();
        console.log(" user ",user)
        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                "User registered Successfully",
                user
            )
        )
    }
)

const loginUser = asyncHandler(
    async (req, res, next) => {
        const { email, password } = req.body;
        if (
            [email, password].some((field) => {
                return field === ""
            })
        ) {
            throw new ApiError(
                402,
                "email and password is required"
            )
        }

        const isUserExist = await User.findOne({ email });

        if (!isUserExist) {
            throw new ApiError(
                402,
                "please register first"
            )
        }

        const isPasswordCorrect = await passwordCorrect(isUserExist._id, password);

        if(
            !isPasswordCorrect
        ){
            res.status(
                402
            ).json(
                new ApiResponse(
                    402,
                    " Incorrect Password "
                )
            )
        }

        const {token} = await generateToken(isUserExist._id);

        const cookieOptions = {
            httpOnly:true,
            secure:true
        }
        res.cookie(
            'token', token , cookieOptions 
        )

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                "User Logged In Successfully",
                { token, isUserExist }
            )
        )

    }
)

const getCurrentUser = asyncHandler(
    async(req,res,next)=>{
        const token = req.cookies?.token || req.headers['authorization'].split(' ')[1];
        console.log("token ", token);
        if(
            !token
        ){
            throw new ApiError(
                402,
                "Unauthorized"
            )
        }

        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

        const user = await User.findById({_id:decodedToken.userId});

        res.json(user);
    }
)

const updateSmtpConfiguration = asyncHandler(
    async(req,res,next)=>{
        const { 
             host, port, username, password, secure
        } = req.body;

        await User.findByIdAndUpdate(
            {_id:req.userId},
            {
            smtpConfig:{
                host, port, username, password, secure
            }
            },
            {
                new:true
            }
        )

        res.status(
            200
        ).json(
            new ApiResponse(
            200,
            "Smtp Configuration updated successfully"
        )
        )

    }
)

const updateUserImapConfig = async (req, res) => {
  try {
    const userId = req.userId; 
    const { host, port, username, password, secure, tls } = req.body;

    if (!host || !port || !username || !password || secure === undefined || tls === undefined) {
      return res.status(400).json({ message: 'Missing IMAP configuration fields' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.imapConfig = {
      host,
      port: parseInt(port), 
      username,
      password, 
      secure: secure === 'true' || secure === true,
      tls: Boolean(tls)
    };

    await user.save();

    res.status(200).json({ message: 'IMAP configuration updated successfully' });
  } catch (error) {
    console.error('Error updating IMAP configuration:', error);
    res.status(500).json({ message: 'Failed to update IMAP configuration' });
  }
};

export const logout = (req, res) => {
    try {
        res.clearCookie('token'); 
        return res.status(200).json({ message: 'Successfully logged out!' });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: 'Something went wrong during logout.' });
    }
}


export {
    registerUser,
    loginUser,
    getCurrentUser,
    updateSmtpConfiguration,
    updateUserImapConfig
}