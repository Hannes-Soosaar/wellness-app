import { UserProgressPost } from "@shared/types/api";
import { pool } from "@backend/server";

export const getLastUserProgress = async (
  userId: string
): Promise<UserProgressPost> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

    

    
    try {
        const result = await pool.query(
      `
      SELECT weight, neck_circumference, waist_circumference, hip_circ
      
        return
  }catch (error) {
    throw new Error(`Failed to fetch last user progress: ${error}`);
  }


};
