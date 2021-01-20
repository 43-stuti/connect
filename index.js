
import cron from 'node-cron';
import express from 'express';

const app = express();
import runwayMessaging from "./runwayMessaging.js"
cron.schedule("* 0 9 * * *", (async function() {
    runwayMessaging();
}));
  
  app.listen(3000);