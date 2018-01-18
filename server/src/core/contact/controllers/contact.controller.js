const ContactService = require('../services/contact.service');
const config = require('../../../../config.json');
const request = require('superagent');

exports.validateContactMail = async (req, res, next) => {
  if (!config.reCAPTCHAValidation) {
    next();
  }
  const postData = {
    secret: config.reCAPTCHASecret,
    response: req.body.captchaResponse
  };

  const result = await request.post('https://www.google.com/recaptcha/api/siteverify')
    .type('application/x-www-form-urlencoded')
    .send(postData);

  if (result.error === true || result.body && result.body.success === false) {
    return res.status(400).json({ status: 400, message: 'Não foi possível enviar o contato.' });
  }

  next();
}

exports.sendContactMail = async (req, res, next) => {
  mail = {
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    email: req.body.email,
    celular: req.body.celular,
    cidade: req.body.cidade,
    entidade: req.body.entidade,
    assunto: req.body.assunto,
    mensagem: req.body.mensagem
  };
  let result = ContactService.sendMail(mail).then(() => {
    return res.status(200).json({ status: 200, message: 'Contato enviado!' });
  }).catch(() => {
    return res.status(400).json({ status: 400, message: 'Não foi possível enviar o contato.' });
  });
}
