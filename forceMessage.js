import puppeteer from 'puppeteer';
import friends from './friends.js';
import messages from './messages.js';

const browser = await puppeteer.launch({headless:false});
const page = await browser.newPage();
await page.goto("https://www.instagram.com/direct/inbox/");
let useFacebook = await page.waitForSelector('.yWX7d');
await useFacebook.click();

//page.waitForSelector("[aria-label='Email address or phone number']");
//await email.click();
//await page.$eval("[aria-label='Email address or phone number']", el => el.value = 'stutspices@yahoo.co.in');
await page.waitForTimeout(3000);
await page.type("[aria-label='Email address or phone number']",'');
await page.type("[aria-label='Password']",'');
let login = await page.waitForSelector('._52e0');
await login.click();

await page.waitForTimeout(10000);
const getThemAll = await page.$$('.DPiy6');
console.log('getThemAll',getThemAll.length);
if(getThemAll && getThemAll.length) {
    const random = Math.floor(Math.random()*(getThemAll.length));
    await getThemAll[random].click();
    await page.waitForSelector('.PjuAP .qyrsm');
    const userName =  await page.$eval('.PjuAP .qyrsm', el => el.innerText);
    if(friends.indexOf(userName) > -1) {
        let messageBox = await page.waitForSelector('.ItkAi');
        let message = messages[Math.floor(Math.random()*(messages.length))];

        await messageBox.click();
        await page.keyboard.type('Hi! ' + userName + ', ' + message , {delay: 30});
        await page.keyboard.press('Enter');
        await page.waitForTimeout(3000); 
    }  

}


//await browser.close();