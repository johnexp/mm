const sender = 'email@gmail.com';
const password = 'password';
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: sender,
    pass: password
  }
});

exports.sendMail = async (mail) => {
  let mailOptions = {
    from:  mail.email,
    to: '"Fred Foo 👻" <analista@valem.com.br>',
    subject: 'Contato Enviado do Portal SASC: ' + mail.assunto,
    text: 'Nome: ' + mail.nome + '\n' + 'Texto: ' + mail.texto,
    html: '<h2>Contato Realizado Através do Portal SASC: </h2><br>' + 
    '<strong>Nome: </strong><span>' + mail.nome + '</span><br><br>' +
    '<strong>Assunto: </strong><span>' + mail.assunto + '</span><br><br>' +
    '<strong>Texto: </strong><span>' + mail.texto + '</span><br><br>'
  };

  return transporter.sendMail(mailOptions);
}