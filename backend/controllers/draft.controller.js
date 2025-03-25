import { Draft } from "../models/draft.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createDraft = asyncHandler(
    async (req, res, next) => {
        const {
            receipent,
            subject,
            body
        } = req.body;

        const user = await User.findById(req.userId);

        if (
            !user || !user.smtpConfig
        ) {
            return res.status(
                400
            ).json(
                new ApiResponse(
                    400,
                    "SMTP Configuration not found"
                )
            )
        }

        const draftEmail = new Draft({
            sender: req.userId,
            receipent,
            subject,
            body,
        });

        await draftEmail.save();

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                "Draft saved Successfully"
            )
        )
    }
)

const getDraft = asyncHandler(
    async(req,res,next) => {
        const drafts = await Draft.find({});
        
        if(
            !drafts
        ){
            res.status(
                404
            ).json(
                new ApiResponse(
                    404,
                    "no draft emails found"
                )
            )
        }

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " draft emails ",
                drafts 
            )
        )

    }
)

const deleteDraft = asyncHandler(async (req, res, next) => {
    const { draftId } = req.params;

    const draft = await Draft.findById(draftId);

    if (!draft) {
        return res.status(404).json(
            new ApiResponse(404, "Draft email not found")
        );
    }

    await Draft.findByIdAndDelete(draftId);

    res.status(200).json(
        new ApiResponse(200, "Draft email deleted successfully")
    );
});



export {
    createDraft,
    getDraft
}