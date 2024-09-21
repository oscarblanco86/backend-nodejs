const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcyNjg2NTk2NX0.zv3A1SSx6N4ZBcTQNjAUDw7aIPX1_dtv8Yee1E0Hgg8';

function verifyToken(token, secret) {
    return jwt.verify(token, secret);
}

const payload = verifyToken(token,secret);
console.log(payload);