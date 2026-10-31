import 'dotenv/config';
import {tokenRequest,saveTokens,scope} from './outlook-oauth.js';
const client_id=process.env.OUTLOOK_CLIENT_ID;
if(!client_id)throw Error('Set OUTLOOK_CLIENT_ID in private server/.env first');
const start=await tokenRequest('devicecode',{client_id,scope});
console.log('\nOpen '+start.verification_uri+' and enter code: '+start.user_code+'\n');
console.log('Sign in with the Outlook account configured as SMTP_USER. Do not share this code.');
const until=Date.now()+start.expires_in*1000;
while(Date.now()<until){await new Promise(resolve=>setTimeout(resolve,Math.max(5,start.interval||5)*1000));try{const result=await tokenRequest('token',{client_id,grant_type:'urn:ietf:params:oauth:grant-type:device_code',device_code:start.device_code});await saveTokens(result);console.log('Outlook connected. Tokens saved in private server/.outlook-oauth.json');process.exit(0);}catch(e){if(/authorization_pending|slow_down/.test(e.message))continue;throw e;}}
throw Error('Authorization expired. Run the command again.');
