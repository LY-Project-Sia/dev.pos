import 'dotenv/config';
import pg from 'pg';
import bcrypt from 'bcryptjs';
const email=process.env.ADMIN_EMAIL?.trim().toLowerCase(),password=process.env.ADMIN_PASSWORD;
if(!email||!password||password.length<16)throw Error('Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 16 characters)');
const pool=new pg.Pool({connectionString:process.env.DATABASE_URL});
try{
 const hash=await bcrypt.hash(password,12);
 const r=await pool.query("INSERT INTO employees(name,email,role,password_hash) VALUES('Owner',$1,'owner',$2) ON CONFLICT(email) DO NOTHING RETURNING id",[email,hash]);
 if(r.rowCount)console.log('Owner created. You can sign in with ADMIN_EMAIL and ADMIN_PASSWORD.');
 else if(process.env.ADMIN_RESET_PASSWORD==='true'){
  const updated=await pool.query("UPDATE employees SET password_hash=$2,active=true WHERE email=$1 AND role='owner' RETURNING id",[email,hash]);
  if(!updated.rowCount)throw Error('Existing email is not an owner account; no password changed');
  console.log('Existing owner password updated. Remove ADMIN_RESET_PASSWORD=true from .env now.');
 }else console.log('Owner already exists. Password unchanged. To reset your own owner password, temporarily set ADMIN_RESET_PASSWORD=true in server/.env and rerun seed.');
}finally{await pool.end()}
