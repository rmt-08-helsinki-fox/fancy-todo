


const app_id = process.env.OXFORD_APP_ID; // insert your APP Id
const app_key = process.env.OXFORD_APP_KEY; // insert your APP Key
const wordId = "eat";
const strictMatch = "false";

const options = {
  host: 'od-api.oxforddictionaries.com',
  port: '443',
  path: '/api/v2/entries/en-gb/' + wordId + '?strictMatch=' + strictMatch,
  method: "GET",
  headers: {
    'app_id': app_id,
    'app_key': app_key
  }
};

http.get(options, (resp) => {
  let body = '';
  resp.on('data', (d) => {
    body += d;
  });
  resp.on('end', () => {
    let parsed = JSON.parse(body);
    console.log(parsed.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);
  });
});