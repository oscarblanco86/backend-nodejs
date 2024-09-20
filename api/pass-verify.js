const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$xIM4fuMVqW.kDbpimYiPhuvT3C/TyhkQS3ZvHc0nld0lgcmDhFJOS';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
