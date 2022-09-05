import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IMemberSchema } from "../../../../@types/interface/memberSchema.interface";
import MESSAGE from "../../../../constants/message";
import memberModel from "../../../../models/member/member.model";
import service from "../../../../services";

export const redirectUser = async (req: Request, res: Response) => {
    try {
        const { _id } = req.query;
        const memberInstance = await memberModel.findById(_id);
        if(memberInstance === null || memberInstance === undefined) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: MESSAGE.get.fail
            });
        }
        const { email, role, first_name, last_name, user_name } = memberInstance;
        const jwtPayload = {_id, email, role, first_name, last_name, user_name};
        const token: string = await service.auth.generateJWT(jwtPayload);
        return res.status(StatusCodes.OK).json({
            message: MESSAGE.get.succ,
            result: {
                token
            }
        })
    } catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: MESSAGE.get.fail,
            err
        });
    }
}