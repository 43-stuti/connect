
import cron from 'node-cron';
import express from 'express';
import dotenv from 'dotenv';
const app = express();
import runwayMessaging from "./runwayMessaging.js"

cron.schedule("* 0 9 * * *", (async function() {
    dotenv.config();
    let obj = {
        rwurl:  process.env.RUNWAY_URL,
        rwtoken:  process.env.RUNWAY_TOKEN,
        instauser:  process.env.INSTAGRAM_USER,
        instapwd:  process.env.INSTAGRAM_PASSWORD

    }
    runwayMessaging(obj);
}));
  app.listen(3000);