import rw from '@runwayml/hosted-models';
import * as fs from 'fs';
import puppeteer from 'puppeteer';
import friends from './friends.js';
const model = new rw.HostedModel({
    url: "https://training-text-experiment-2-1-22a6f52c.hosted-models.runwayml.cloud/v1/",
    token: "0dBa6HI0+XjZ8taZAgJzSA==",
  });
  //// You can use the info() method to see what type of input object the model expects
  // model.info().then(info => console.log(info));
  let seed = Math.floor(Math.random()*300);
  const inputs = {
    "prompt": "Do you think",
    "max_characters": 300,
    "top_p": 0.9,
    "seed": seed
  };
  model.query(inputs).then(async function(outputs) {
    const { generated_text, encountered_end } = outputs;
    console.log('GENERATED TEXT',generated_text)
    const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        await page.goto("https://www.instagram.com/direct/inbox/");
        let useFacebook = await page.waitForSelector('.yWX7d');
        await useFacebook.click();

        //page.waitForSelector("[aria-label='Email address or phone number']");
        //await email.click();
        //await page.$eval("[aria-label='Email address or phone number']", el => el.value = 'stutspices@yahoo.co.in');
        await page.waitForTimeout(3000);
        //await page.type("[aria-label='Email address or phone number']",'stuti.mohgaonkar@gmail.com');
        //await page.type("[aria-label='Password']",'icecreaminmagie');
        //let login = await page.waitForSelector('._52e0');
        //await login.click();

        await page.waitForTimeout(30000);
        const getThemAll = await page.$$('.DPiy6');
        console.log('getThemAll',getThemAll.length);
        if(getThemAll && getThemAll.length) {
            const random = Math.floor(Math.random()*(getThemAll.length));
            await getThemAll[random].click();
            await page.waitForSelector('.PjuAP .qyrsm');
            const userName =  await page.$eval('.PjuAP .qyrsm', el => el.innerText);
            if(friends.indexOf(userName) > -1) {
                let messageBox = await page.waitForSelector('.ItkAi');
                await messageBox.click();
                await page.keyboard.type(generated_text , {delay: 30});
                await page.keyboard.press('Enter');
                await page.waitForTimeout(3000); 
            }  

        }
  });