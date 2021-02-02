const jwtHelper = require('./helpers/jsonwebtoken.js');
function test() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1c3VuLm5lbGF5YW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkZ0FLbDhJc1o2VkRVMUFvWHMuUEllZWh1bVFmd3g4dVYuRkRwYUhxT2ZFWWZ3RFFNcExhSnUiLCJpYXQiOjE2MTIxOTUwNTB9.tE-GdGnyUg_6WY3Zk9d74WAQV9-Hv-JVJyUGjapuMZI';

  const result = jwtHelper.verifyToken(token);
  console.log(result.email)
}

test();