const BannerService = require('../../banner/services/banner.service'),
  ApresentacaoSiteService = require('../../apresentacao-site/services/apresentacao-site.service'),
  ApresentacaoPlanosService = require('../../apresentacao-planos/services/apresentacao-planos.service'),
  ItemAreaClienteService = require('../../item-area-cliente/services/item-area-cliente.service');

exports.getConteudoHome = async (req, res, next) => {
  try {
    const apresentacaoSite = await ApresentacaoSiteService.getApresentacaoSite();
    const apresentacaoPlanos = await ApresentacaoPlanosService.getApresentacaoPlanos();
    const itemAreaCliente = await ItemAreaClienteService.getItensHome();
    return res.status(200).json({
      apresentacaoSite: apresentacaoSite,
      apresentacaoPlanos: apresentacaoPlanos,
      itemAreaCliente: itemAreaCliente
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: 'Ocorreu um erro ao obter o conteúdo da página' });
  }
}
