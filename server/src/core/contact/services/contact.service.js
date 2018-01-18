const config = require('../../../../config.json'),
nodemailer = require('nodemailer'),
transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mailSender,
    pass: config.mailPassword
  }
}),
AssuntoContato = require('../../../modules/assunto-contato/models/assunto-contato.model');

exports.sendMail = async (mail) => {
  const assunto = await AssuntoContato.findById(mail.assunto);
  const mailOptions = {
    from: mail.email || 'site@valem.com.br',
    to: `"Supervisão Valem" <${assunto.email}>`,
    subject: 'Contato Enviado Através do Site: ' + assunto.assunto,
    text: 'Nome: ' + mail.nome + '\n' + 'Mensagem: ' + mail.mensagem,
    html: '<h2>Contato Realizado: </h2><br>' +
    '<strong>Nome: </strong><span>' + mail.nome + '</span><br><br>' +
    '<strong>Sobrenome: </strong><span>' + mail.sobrenome + '</span><br><br>' +
    (mail.email ? '<strong>Email: </strong><span>' + mail.email + '</span><br><br>' : '') +
    '<strong>Celular: </strong><span>' + mail.celular + '</span><br><br>' +
    '<strong>Cidade: </strong><span>' + mail.cidade + '</span><br><br>' +
    '<strong>Entidade: </strong><span>' + mail.entidade + '</span><br><br>' +
    '<strong>Assunto: </strong><span>' + assunto.assunto + '</span><br><br>' +
    '<strong>Mensagem: </strong><span>' + mail.mensagem + '</span><br><br>'
  };

  return transporter.sendMail(mailOptions);
}