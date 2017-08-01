module.exports = {
  mongoUri: "data",
  winMachine: false,
  port:3000,
  secret: "h8237hed8w7i29eu3j9e39zj",
  admins: ['alvareza'],
  verificationExpiration: 86400000,
  mailTransporter: {
    service: 'gmail',
    auth: {
      user: 'angelgabalvarez@gmail.com',
      pass: 'An931903s2M1T' //Keep this secret
    }
  },
  appURL: "http://localhost:3000",
  https: false
}
