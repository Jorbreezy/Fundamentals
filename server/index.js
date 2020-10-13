import express from "express";
import test from "./routes/app";
const app = express();
const PORT = 3000;

app.use('/', test);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));