# connect

#### Overview 

I love it when given the chance to talk to someone completely out of the blue but I usually lack the courage to take the initiative. 
It is also painful to find intersting conversation starters(something that doesn't just end up being "Hey! How are you doing").

I had just been introduced to runwayML. I decided to use ML to help me break out of my social bubble. 
I trained the model on tweets from @theshowerthoughts account and some of my whatsapp chats. 2 hours later, I had my model completing my sentences in the funniest and the most absurd way. 

I wrote a puppeteer script that is scheduled to run at 9am everyday(using the nodejs cronjob). 
This script 
- logs into my account
- randomly picks a follower from my messages list
- picks a prompt from my predefined list of prompts []
- sends the prompt to my hosted runway model and waits for a response. 
- once it gets the response from the runway API, it shoots the message to my selected follower.

So while I am sleeping at 9am, my script it out on an adventure to pump up my social engagement. 
It has been doing this for the past 2 months daily and I have had wonderful conversations with people and often times, embarrased myself too. 
When stuff like - gets sent :)
But regardless, it has been absolute fun continuing this. 