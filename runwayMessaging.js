import rw from '@runwayml/hosted-models';
import puppeteer from 'puppeteer';
import friends from './friends.js';
import prompt from './prompt.js';
export default function(data){
  const model = new rw.HostedModel({
    url: data.rwurl,
    token: data.rwtoken,
  });
  
  //fetching a randomly generated text from runway
  let seed = Math.floor(Math.random()*300);
  let runwayPrompt = Math.floor(Math.random()*(prompt.length-1));
  const inputs = {
    "prompt": prompt[runwayPrompt],
    "max_characters": 300,
    "top_p": 0.9,
    "seed": seed
  };
  model.query(inputs).then(async function(outputs) {
    const { generated_text, encountered_end } = outputs;

    //logging in to instgram and sending the message to a selected person using puppeteer
    const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        await page.goto("https://www.instagram.com/direct/inbox/");
        let useFacebook = await page.waitForSelector('.yWX7d');
        await useFacebook.click();

        page.waitForSelector("[aria-label='Email address or phone number']");
        await email.click();
        await page.waitForTimeout(3000);
        await page.type("[aria-label='Email address or phone number']",data.instauser);
        await page.type("[aria-label='Password']",data.instapwd);
        let login = await page.waitForSelector('._52e0');
        await login.click();

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
}