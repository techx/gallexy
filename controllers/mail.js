
const nodemailer = require("nodemailer");
const settings = require("../settings");
//setup mailer
const transporter = nodemailer.createTransport(settings.mailTransporter);

const from = '"GalleXy" <' + settings.mailTransporter.auth.user + '>';

module.exports.newUserEmail = function(newUser) {
  var verificationURL = settings.appURL + '/verify?kerberos=' + newUser.kerberos+ "&code="+newUser.security.code;
  var textTemplate = `Hello Maker!

You're almost done setting up a new <a href=${settings.appURL}>GalleXy</a> account. GalleXy is an gallery website to showcase projects made by your peers here at MIT.

If you did not set up this account, please ignore this email.

Visit this link below to finish the verification process:
${verificationURL}


Powered By TechX
  `;
  var htmlTemplate = `<p>Hello Maker!</p>
<p>You're almost done setting up a new GalleXy account. GalleXy is an gallery website to showcase projects made by your peers here at MIT.</p>
<p><b>If you did not set up this account, please ignore this email.</b></p>
<br>
<p>Visit this link below to finish the verification process:</p>
<p><a href="${verificationURL}">${verificationURL}</a></p>
<br>
<br>
<p><i>Powered By TechX</i></p>
  `;

  var mailOptions = {
      from: from,
      to: newUser.email, // list of receivers
      subject: 'Confirm your new GalleXy account', // Subject line
      text: textTemplate, // plain text body
      html: htmlTemplate// html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
