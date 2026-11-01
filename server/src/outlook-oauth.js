import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const tokenPath=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../.outlook-oauth.json');
const tenant='consumers';
const scope='offline_access https://outlook.office.com/SMTP.Send';
const base='https://login.microsoftonline.com/'+tenant+'/oauth2/v2.0/';
export async function tokenRequest(endpoint,fields){const res=await fetch(base+endpoint,{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded'},body:new URLSearchParams(fields),signal:AbortSignal.timeout(15000)});const data=await res.json();if(!res.ok)throw new Error(data.error_description||data.error||'Microsoft authorization failed');return data;}
export async function saveTokens(data){const old=await readTokens().catch(()=>({}));const value={...old,...data,expires_at:Date.now()+Number(data.expires_in||3600)*1000};await fs.writeFile(tokenPath,JSON.stringify(value),{mode:0o600});}
export async function readTokens(){return JSON.parse(await fs.readFile(tokenPath,'utf8'));}
export async function outlookAccessToken(){const client_id=process.env.OUTLOOK_CLIENT_ID;if(!client_id)throw Error('OUTLOOK_CLIENT_ID is missing');const current=await readTokens();if(current.access_token&&current.expires_at>Date.now()+60000)return current.access_token;if(!current.refresh_token)throw Error('Outlook account not connected');const data=await tokenRequest('token',{client_id,grant_type:'refresh_token',refresh_token:current.refresh_token,scope});await saveTokens(data);return data.access_token;}
export {scope};
