const nodemailer = require('nodemailer');
const ContatoService = require('../services/contato.service');

exports.sendContactMail = async (req, res, next) => {
  mail = {
    texto: req.body.texto,
    assunto: req.body.assunto,
    nome: req.body.nome,
    email: req.body.email
  };
  let result = ContatoService.sendMail(mail).then(() => {
    return res.status(200).json({ status: 200, message: 'Contato enviado!' });
  }).catch(() => {
    return res.status(400).json({ status: 400., message: 'Não foi possível enviar o contato.' });
  });
}
