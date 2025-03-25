import { SentEmail } from "../models/sentEmail.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import nodemailer from 'nodemailer';

const getSentEmails = asyncHandler(
    async(req,res,next)=>{
        console.log("req userId ", req.userId);
        const sentEmails = await SentEmail.find({
            sender:req.userId
        }).sort({
            timestamps:-1
        });
        console.log("sent Emails ", sentEmails);
        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                "sent emails",
                sentEmails 
            )
        )
    }
)

const sendEmail = asyncHandler(
    async(req,res,next)=>{
        const {
            receipent, subject, body
        } = req.body;
    
        const user = await User.findById(req.userId); 

        if(
            !user || !user.smtpConfig 
        ){
            return res.status(
                400
            ).json(
                new ApiResponse(
                    400,
                    "SMTP Configuration not found"
                )
            )
        }

        const transporter = nodemailer.createTransport(
            {
                host:user.smtpConfig.host,
                port:user.smtpConfig.port,
                secure:user.smtpConfig.secure ,
                auth:{
                    user:user.smtpConfig.username,
                    pass:user.smtpConfig.password 
                }
            }
        );

        const mailOptions = {
            from:user.email,
            to:receipent,
            subject:subject,
            html:body
        }

        await transporter.sendMail(mailOptions);
        
        // Save send Email to database 
        const sentEmail = new SentEmail({
            sender:req.userId,
            receipent,
            subject,
            body, 
        });

        await sentEmail.save();

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                "Email Sent Successfully" 
            )
        ) 
    }
)

export {
    getSentEmails ,
    sendEmail 
}


