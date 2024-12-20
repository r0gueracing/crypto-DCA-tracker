import express from "express";

import dotenv from "dotenv";

import cron from 'node-cron'

import { updateCryptoPrices } from "./src/services/notionService.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {

 try {

   await updateCryptoPrices();

   res.status(200).json({ message: "Portfolio updated successfully" });

 } catch (error) {

   console.error("Error updating crypto prices:", error);

   res.status(500).send("Error updating crypto prices.");

 }

});

// Schedule the task to run every min

cron.schedule('*/10 * * * *', async () => {

 try {

   await updateCryptoPrices();

 } catch (error) {

   console.error('Error during scheduled update:', error);

 }

});

app.listen(port, () => {

 console.log(`Server is running on http://localhost:${port}`);

});
