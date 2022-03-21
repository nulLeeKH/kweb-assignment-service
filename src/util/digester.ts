import * as crypto from 'crypto';
import { config as envConfig } from 'dotenv'
envConfig()

export function digestPassword(password:string, salt?:string): string[] {
  let passwordVar:string = password
  let saltVar:string|undefined = salt
  if (undefined == saltVar) {
    saltVar = crypto.randomBytes(192).toString('base64').substring(0, 255);
  }

  for (let i=0;i<3;i++) passwordVar =
    crypto.createHash('sha512').update(passwordVar + saltVar).digest('hex');

  return [passwordVar, saltVar];
}
