const express = require('express');
const router = express.Router();

const FormulariosController = require('../controllers/formularios.controller');

// Map each API to the Controller Functions
router.post('/public/alteracao-cadastral', FormulariosController.validateRecaptcha, FormulariosController.sendAlteracaoCadastralMail);
router.post('/public/alteracao-endereco', FormulariosController.validateRecaptcha, FormulariosController.sendAlteracaoEnderecoMail);
router.post('/public/segunda-via-boleto', FormulariosController.validateRecaptcha, FormulariosController.sendSegundaViaBoletoMail);
router.post('/public/segunda-via-contrato', FormulariosController.validateRecaptcha, FormulariosController.sendSegundaViaContratoMail);
router.post('/public/segunda-via-carteirinha', FormulariosController.validateRecaptcha, FormulariosController.sendSegundaViaCarteirinhaMail);
router.post('/public/declaracao-carencias', FormulariosController.validateRecaptcha, FormulariosController.sendDeclaracaoCarenciasMail);
router.post('/public/declaracao-auxilio-saude', FormulariosController.validateRecaptcha, FormulariosController.sendDeclaracaoAuxilioSaudeMail);
router.post('/public/cancelamento', FormulariosController.validateRecaptcha, FormulariosController.sendCancelamentoMail);
router.post('/public/recibo-pagamento-quitacao', FormulariosController.validateRecaptcha, FormulariosController.sendReciboPagamentoQuitacaoMail);
router.post('/public/detalhamento-coparticipacao', FormulariosController.validateRecaptcha, FormulariosController.sendDetalhamentoCoparticipacaoMail);

module.exports = router;