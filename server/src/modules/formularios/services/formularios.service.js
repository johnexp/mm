const config = require('../../../../config.json'),
nodemailer = require('nodemailer'),
transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mailSender,
    pass: config.mailPassword
  }
});
Param = require('../../../core/param/models/param.model');

exports.sendAlteracaoCadastralMail = async (mail) => {
  const param = await Param.findOne({ key: 'EMAIL_DESTINATARIO_FORMULARIOS' });
  const mailOptions = {
    to: `<${param.value}>`,
    subject: 'Site Valem: Solicitação de Alteração Cadastral',
    text: 'Nome: ' + mail.nome + '\n' + 'Dados a Serem Alterados: ' + mail.descricao,
    html: '<h2>Solicitação de Alteração Cadastral: </h2><br>' +
    '<strong>Nome: </strong><span>' + mail.nome + '</span><br><br>' +
    '<strong>CPF: </strong><span>' + mail.cpf + '</span><br><br>' +
    '<strong>Dados a Serem Alterados: </strong><span>' + mail.descricao + '</span><br><br>'
  };

  return await transporter.sendMail(mailOptions);
}

exports.sendAlteracaoEnderecoMail = async (mail) => {
  const param = await Param.findOne({ key: 'EMAIL_DESTINATARIO_FORMULARIOS' });
  const mailOptions = {
    to: `<${param.value}>`,
    subject: 'Site Valem: Solicitação de Alteração de Endereço',
    text: 'Nome: ' + mail.nome + '\n' + 'Novo Endereço: ' + mail.descricao,
    html: '<h2>Solicitação de Alteração de Endereço: </h2><br>' +
    '<strong>Nome: </strong><span>' + mail.nome + '</span><br><br>' +
    '<strong>CPF: </strong><span>' + mail.cpf + '</span><br><br>' +
    '<strong>Tipo de Endereço: </strong><span>' + mail.tipoEndereco + '</span><br><br>' +
    '<strong>Novo Endereço: </strong><span>' + mail.descricao + '</span><br><br>'
  };

  return await transporter.sendMail(mailOptions);
}

exports.sendSegundaViaBoletoMail = async (mail) => {
  const param = await Param.findOne({ key: 'EMAIL_DESTINATARIO_FORMULARIOS' });
  const mailOptions = {
    to: `<${param.value}>`,
    subject: 'Site Valem: 2ª Via de Boleto',
    text: 'Nome: ' + mail.nome + '\n' + 'Data de Vencimento: ' + mail.dataVencimento,
    html: '<h2>Solicitação de 2ª Via de Boleto: </h2><br>' +
    '<strong>Nome: </strong><span>' + mail.nome + '</span><br><br>' +
    '<strong>CPF: </strong><span>' + mail.cpf + '</span><br><br>' +
    '<strong>Data de Vencimento: </strong><span>' + mail.dataVencimento + '</span><br><br>'
  };

  return await transporter.sendMail(mailOptions);
}

exports.sendSegundaViaContratoMail = async (mail) => {
  const param = await Param.findOne({ key: 'EMAIL_DESTINATARIO_FORMULARIOS' });
  const mailOptions = {
    to: `<${param.value}>`,
    subject: 'Site Valem: 2ª Via de Contrato',
    text: 'Nome: ' + mail.nome + '\n' + 'Data de Vigência: ' + mail.dataVigencia,
    html: '<h2>Solicitação de 2ª Via de Contrato: </h2><br>' +
    '<strong>Nome: </strong><span>' + mail.nome + '</span><br><br>' +
    '<strong>CPF: </strong><span>' + mail.cpf + '</span><br><br>' +
    '<strong>Data de Vigência: </strong><span>' + mail.dataVigencia + '</span><br><br>'
  };

  return await transporter.sendMail(mailOptions);
}

exports.sendSegundaViaCarteirinhaMail = async (mail) => {
  const param = await Param.findOne({ key: 'EMAIL_DESTINATARIO_FORMULARIOS' });
  const mailOptions = {
    to: `<${param.value}>`,
    subject: 'Site Valem: 2ª Via de Carteirinha',
    text: 'Nome: ' + mail.nome + '\n' + 'Nome dos Beneficiários: ' + mail.nomeBeneficiarios,
    html: '<h2>Solicitação de 2ª Via de Carteirinha: </h2><br>' +
    '<strong>Nome: </strong><span>' + mail.nome + '</span><br><br>' +
    '<strong>CPF: </strong><span>' + mail.cpf + '</span><br><br>' +
    '<strong>Nome dos Beneficiários: </strong><span>' + mail.nomeBeneficiarios + '</span><br><br>'
  };

  return await transporter.sendMail(mailOptions);
}

exports.sendDeclaracaoCarenciasMail = async (mail) => {
  const param = await Param.findOne({ key: 'EMAIL_DESTINATARIO_FORMULARIOS' });
  const mailOptions = {
    to: `<${param.value}>`,
    subject: 'Site Valem: Declaração de Carências',
    text: 'Nome: ' + mail.nome + '\n' + 'Data de Vigência do Plano: ' + mail.dataVigencia,
    html: '<h2>Solicitação de Declaração de Carências: </h2><br>' +
    '<strong>Nome: </strong><span>' + mail.nome + '</span><br><br>' +
    '<strong>CPF: </strong><span>' + mail.cpf + '</span><br><br>' +
    '<strong>Data de Vigência do Plano: </strong><span>' + mail.dataVigencia + '</span><br><br>'
  };

  return await transporter.sendMail(mailOptions);
}

exports.sendDeclaracaoAuxilioSaudeMail = async (mail) => {
  const param = await Param.findOne({ key: 'EMAIL_DESTINATARIO_FORMULARIOS' });
  const mailOptions = {
    to: `<${param.value}>`,
    subject: 'Site Valem: Declaração Auxílio Saúde',
    text: 'Nome: ' + mail.nome + '\n' + 'Data de Vigência do Plano: ' + mail.dataVigencia,
    html: '<h2>Solicitação de Declaração Auxílio Saúde: </h2><br>' +
    '<strong>Nome: </strong><span>' + mail.nome + '</span><br><br>' +
    '<strong>CPF: </strong><span>' + mail.cpf + '</span><br><br>' +
    '<strong>Data de Vigência do Plano: </strong><span>' + mail.dataVigencia + '</span><br><br>'
  };

  return await transporter.sendMail(mailOptions);
}

exports.sendCancelamentoMail = async (mail) => {
  const param = await Param.findOne({ key: 'EMAIL_DESTINATARIO_FORMULARIOS' });
  const mailOptions = {
    to: `<${param.value}>`,
    subject: 'Site Valem: Solicitação de Cancelamento',
    text: 'Nome: ' + mail.nome + '\n' + 'Nome dos Beneficiários: ' + mail.nomeBeneficiarios,
    html: '<h2>Solicitação de Cancelamento: </h2><br>' +
    '<strong>Nome: </strong><span>' + mail.nome + '</span><br><br>' +
    '<strong>CPF: </strong><span>' + mail.cpf + '</span><br><br>' +
    '<strong>Nome dos Beneficiários: </strong><span>' + mail.nomeBeneficiarios + '</span><br><br>' +
    '<strong>Motivo Cancelamento: </strong><span>' + mail.motivoCancelamento + '</span><br><br>'
  };

  return await transporter.sendMail(mailOptions);
}

exports.sendReciboPagamentoQuitacaoMail = async (mail) => {
  const param = await Param.findOne({ key: 'EMAIL_DESTINATARIO_FORMULARIOS' });
  const mailOptions = {
    to: `<${param.value}>`,
    subject: 'Site Valem: Solicitação de Recibo de Pagamento',
    text: 'Nome: ' + mail.nome + '\n' + 'Data de Vencimento do Boleto: ' + mail.dataVencimento,
    html: '<h2>Solicitação de Recibo de Pagamento/Quitação: </h2><br>' +
    '<strong>Nome: </strong><span>' + mail.nome + '</span><br><br>' +
    '<strong>CPF: </strong><span>' + mail.cpf + '</span><br><br>' +
    '<strong>Data de Vencimento do Boleto: </strong><span>' + mail.dataVencimento + '</span><br><br>'
  };

  return await transporter.sendMail(mailOptions);
}

exports.sendDetalhamentoCoparticipacaoMail = async (mail) => {
  const param = await Param.findOne({ key: 'EMAIL_DESTINATARIO_FORMULARIOS' });
  const mailOptions = {
    to: `<${param.value}>`,
    subject: 'Site Valem: Solicitação de Detalhamento de Coparticipação',
    text: 'Nome: ' + mail.nome + '\n' + 'Nome dos Beneficiários: ' + mail.dataVencimento,
    html: '<h2>Solicitação de Detalhamento de Coparticipação: </h2><br>' +
    '<strong>Nome: </strong><span>' + mail.nome + '</span><br><br>' +
    '<strong>CPF: </strong><span>' + mail.cpf + '</span><br><br>' +
    '<strong>Data de Vencimento do Boleto Cobrança: </strong><span>' + mail.dataVencimento + '</span><br><br>'
  };

  return await transporter.sendMail(mailOptions);
}