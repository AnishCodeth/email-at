// import dotenv  from "dotenv";
import { google } from 'googleapis';
import nodemailer from 'nodemailer'

const OAuth2=google.auth.OAuth2

// dotenv.config()

//creating the authclient instance

export const emailConfig=async()=>{
const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
    refresh_token:process.env.OAUTH_REFRESH_TOKEN
})

//for the accesstoken
const accessToken=await oauth2Client.getAccessToken()

//creating transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.OAUTH_EMAIL,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken.toString()
    }

});
return transporter

}