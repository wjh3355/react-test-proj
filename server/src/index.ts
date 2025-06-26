import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
   console.log("/api/health: All good!");
   res.json({ status: "OK" });
});

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
