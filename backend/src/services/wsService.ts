import { io } from "@backend/server";
import { getUserDashboard } from "../services/user/dashboardService";

export const emitUserDashboardUpdate = async (
  userId: string
): Promise<void> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  console.log("Emitting user dashboard update for user ID:", userId);

  try {
    const response = await getUserDashboard(userId);
    io.emit("dashboardUpdated", response);
  } catch (error) {
    console.error("Error fetching user dashboard data:", error);
  }
};
