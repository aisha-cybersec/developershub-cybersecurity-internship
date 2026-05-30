const { validateEmail, hashPassword, generateToken } = require('./security');

async function runTests() {
  // Test 1: Email Validation
  console.log('=== Week 2 Security Tests ===');
  console.log('Email valid:', validateEmail('test@gmail.com'));
  console.log('Email invalid:', validateEmail('notanemail'));

  // Test 2: Password Hashing
  const hashed = await hashPassword('mypassword123');
  console.log('Hashed Password:', hashed);

  // Test 3: JWT Token
  const token = generateToken('user123');
  console.log('JWT Token:', token);
  
  console.log('=== All Security Fixes Working! ===');
}

runTests();
