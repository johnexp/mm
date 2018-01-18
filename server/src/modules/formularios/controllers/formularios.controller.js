const FormulariosService = require('../services/formularios.service');
const config = require('../../../../config.json');
const request = require('superagent');

exports.validateRecaptcha = async (req, res, next) => {
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

exports.sendAlteracaoCadastralMail = async (req, res, next) => {
  mail = {
    nome: req.body.nome,
    cpf: req.body.cpf,
    descricao: req.body.descricao
  };
  let result = FormulariosService.sendAlteracaoCadastralMail(mail).then(() => {
    return res.status(200).json({ status: 200, message: 'Solicitação enviada!' });
  }).catch((e) => {
    return res.status(400).json({ status: 400, message: 'Não foi possível enviar a solicitação.' });
  });
}

exports.sendAlteracaoEnderecoMail = async (req, res, next) => {
  mail = {
    nome: req.body.nome,
    cpf: req.body.cpf,
    tipoEndereco: req.body.tipoEndereco,
    descricao: req.body.descricao
  };
  let result = FormulariosService.sendAlteracaoEnderecoMail(mail).then(() => {
    return res.status(200).json({ status: 200, message: 'Solicitação enviada!' });
  }).catch((e) => {
    return res.status(400).json({ status: 400, message: 'Não foi possível enviar a solicitação.' });
  });
}

exports.sendSegundaViaBoletoMail = async (req, res, next) => {
  mail = {
    nome: req.body.nome,
    cpf: req.body.cpf,
    dataVencimento: req.body.dataVencimento.day + '/' + req.body.dataVencimento.month + '/' + req.body.dataVencimento.year
  };
  let result = FormulariosService.sendSegundaViaBoletoMail(mail).then(() => {
    return res.status(200).json({ status: 200, message: 'Solicitação enviada!' });
  }).catch((e) => {
    return res.status(400).json({ status: 400, message: 'Não foi possível enviar a solicitação.' });
  });
}

exports.sendSegundaViaContratoMail = async (req, res, next) => {
  mail = {
    nome: req.body.nome,
    cpf: req.body.cpf,
    dataVigencia: req.body.dataVigencia.day + '/' + req.body.dataVigencia.month + '/' + req.body.dataVigencia.year
  };
  let result = FormulariosService.sendSegundaViaContratoMail(mail).then(() => {
    return res.status(200).json({ status: 200, message: 'Solicitação enviada!' });
  }).catch((e) => {
    return res.status(400).json({ status: 400, message: 'Não foi possível enviar a solicitação.' });
  });
}

exports.sendSegundaViaCarteirinhaMail = async (req, res, next) => {
  mail = {
    nome: req.body.nome,
    cpf: req.body.cpf,
    nomeBeneficiarios: req.body.nomeBeneficiarios || ''
  };
  let result = FormulariosService.sendSegundaViaCarteirinhaMail(mail).then(() => {
    return res.status(200).json({ status: 200, message: 'Solicitação enviada!' });
  }).catch((e) => {
    return res.status(400).json({ status: 400, message: 'Não foi possível enviar a solicitação.' });
  });
}

exports.sendDeclaracaoCarenciasMail = async (req, res, next) => {
  mail = {
    nome: req.body.nome,
    cpf: req.body.cpf,
    dataVigencia: req.body.dataVigencia.day + '/' + req.body.dataVigencia.month + '/' + req.body.dataVigencia.year
  };
  let result = FormulariosService.sendDeclaracaoCarenciasMail(mail).then(() => {
    return res.status(200).json({ status: 200, message: 'Solicitação enviada!' });
  }).catch((e) => {
    return res.status(400).json({ status: 400, message: 'Não foi possível enviar a solicitação.' });
  });
}

exports.sendDeclaracaoAuxilioSaudeMail = async (req, res, next) => {
  mail = {
    nome: req.body.nome,
    cpf: req.body.cpf,
    dataVigencia: req.body.dataVigencia.day + '/' + req.body.dataVigencia.month + '/' + req.body.dataVigencia.year
  };
  let result = FormulariosService.sendDeclaracaoAuxilioSaudeMail(mail).then(() => {
    return res.status(200).json({ status: 200, message: 'Solicitação enviada!' });
  }).catch((e) => {
    return res.status(400).json({ status: 400, message: 'Não foi possível enviar a solicitação.' });
  });
}

exports.sendCancelamentoMail = async (req, res, next) => {
  mail = {
    nome: req.body.nome,
    cpf: req.body.cpf,
    nomeBeneficiarios: req.body.nomeBeneficiarios,
    motivoCancelamento: req.body.motivoCancelamento
  };
  let result = FormulariosService.sendCancelamentoMail(mail).then(() => {
    return res.status(200).json({ status: 200, message: 'Solicitação enviada!' });
  }).catch((e) => {
    return res.status(400).json({ status: 400, message: 'Não foi possível enviar a solicitação.' });
  });
}

exports.sendReciboPagamentoQuitacaoMail = async (req, res, next) => {
  mail = {
    nome: req.body.nome,
    cpf: req.body.cpf,
    dataVencimento: req.body.dataVencimento.day + '/' + req.body.dataVencimento.month + '/' + req.body.dataVencimento.year
  };
  let result = FormulariosService.sendReciboPagamentoQuitacaoMail(mail).then(() => {
    return res.status(200).json({ status: 200, message: 'Solicitação enviada!' });
  }).catch((e) => {
    return res.status(400).json({ status: 400, message: 'Não foi possível enviar a solicitação.' });
  });
}

exports.sendDetalhamentoCoparticipacaoMail = async (req, res, next) => {
  mail = {
    nome: req.body.nome,
    cpf: req.body.cpf,
    dataVencimento: req.body.dataVencimento.day + '/' + req.body.dataVencimento.month + '/' + req.body.dataVencimento.year
  };
  let result = FormulariosService.sendDetalhamentoCoparticipacaoMail(mail).then(() => {
    return res.status(200).json({ status: 200, message: 'Solicitação enviada!' });
  }).catch((e) => {
    return res.status(400).json({ status: 400, message: 'Não foi possível enviar a solicitação.' });
  });
}
