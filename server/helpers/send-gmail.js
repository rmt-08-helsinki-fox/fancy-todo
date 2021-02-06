const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

function sendGmail (emailTarget, todo){
  try {

    // If modifying these scopes, delete token.json.
    const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 
        'https://www.googleapis.com/auth/gmail.send'];
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    const TOKEN_PATH = './config/token.json';

    // Load client secrets from a local file.
    fs.readFile('./config/credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Gmail API.
      authorize(JSON.parse(content), sendEmail);
    });

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
        console.log(credentials)
      const {client_secret, client_id, redirect_uris} = credentials.web;
      const oAuth2Client = new google.auth.OAuth2(
          client_id, client_secret, redirect_uris);

      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
      });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    function getNewToken(oAuth2Client, callback) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(corr);
        console.log('Token stored to', (err, token) => {
          if (err) return console.error('Error retrieving access token', err);
          oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
          });
          callback(oAuth2Client);
        });
      });
    }

    function sendEmail (auth) {
      console.log(`on process send email to ${emailTarget}`)
      const gmail = google.gmail({version: 'v1', auth});
      const subject = 'Fancy Todo - New Todo Created 🤘';
      const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
      const messageParts = [
        'From: Fancy Todo App <apptodolist365@gmail.com>',
        `To: ${emailTarget}`,
        'Content-Type: text/html; charset=utf-8',
        'MIME-Version: 1.0',
        `Subject: ${utf8Subject}`,
        '',
        'You have created a new Todo:.',
        `Title: ${todo.title}`,
        `Description: ${todo.description}`,
        `Due_date: ${todo.due_date}`,
        'I hope you could finish it! So... <b>Good Luck</b>  🤘❤️😎',
      ];
      const message = messageParts.join('\n');
      // The body needs to be base64url encoded.
      const encodedMessage = Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      const res = gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: encodedMessage,
        },
      });
      console.log(res, 'email processed');
      return res;
    }
  }
  catch(err) {
    console.log(err)
    next(err)
  }
}
let email = 'ferdian.twbi@gmail.com';
let todo = {
  title: 'abc',
  description: '',
  due_date: '2020-04-05'
};

module.exports = sendGmail;