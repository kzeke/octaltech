const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const sendgridTransporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: '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'
  }
}));

module.exports.sendEmailViaSendgrid = (to, from, subject, html) => {
  sendgridTransporter.sendMail({
    to: to,
    from: from,
    subject: subject,
    html: html
  }).catch(err => {
    console.log(err);
  });
}