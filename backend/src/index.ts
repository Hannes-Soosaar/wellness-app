// import server from "../server";
import userRouter from "./routes/userRouts";
import apiRouter from "./routes/apiRouts";
import testRouter from "./routes/testRouts";
import authRouter from "./routes/authRouts";
import { app, httpsServer } from "../server";

// Start the HTTPS server
httpsServer.listen(5000, () => {
  console.log("HTTPS server running on https://localhost:5000");
});

// handle routes
app.use("/api", apiRouter);
app.use("/user", userRouter);
app.use("/test", testRouter);
app.use("/auth", authRouter);
app.use("/ai", authRouter);

app.post("/test", async (req, res) => {
  console.log("Test request received:", req.body);
  res.status(200).json({ message: "Test successful" });
});
