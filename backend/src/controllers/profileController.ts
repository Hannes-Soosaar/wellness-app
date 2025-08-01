import { ProfilePost, ResponseData, UserDashboard } from "@shared/types/api";
import { Request, Response, RequestHandler } from "express";
import { getUserId } from "./verificationController";
import { ResolveFnOutput } from "module";

interface ProfileUpdateRequest extends Request {
  body: ProfilePost;
}

export const updateProfile: RequestHandler = async (
  req: ProfileUpdateRequest,
  res: Response
) => {
  console.log("We arrived at the profile controller!");
  console.log("request body", req);

  let responseData: ResponseData<null> = {
    success: false,
    message: "",
  };

  const userId = getUserId(req);
  if (!userId) {
    responseData.error = "Unable to to update profile";
    res.status(401).json(responseData);
    return;
  }

  try {
    const response = await updateUserProfile(userId:string, req.body);
  } catch (error) {
    responseData.error = "Failed to update profile";
    res.status(500).json(responseData);
  }


  res.status(200).json({ message: "Task completed" });
};


export const updateUserProgress: RequestHandler = async (req: Request, res: Response) => {
  let responseData: ResponseData<null> = {
    success: false,
    message: "",
  };
    const userId = getUserId(req);


res.status(200).json({ message: "Progress updated" });

}



export const getUserDashboard: RequestHandler = async (req:Request, res: Response) => {

    let responseData: ResponseData<null> = {
    success: false,
    message: "",
    };
  
   const userId = getUserId(req);

  console.log("We arrived at the get dashboard controller!");
  console.log("request body", req.body);
  res.status(200).json({ message: "Dashboard data retrieved" });
};
