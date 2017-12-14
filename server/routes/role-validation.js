let User = require('../src/user/models/user.model');

exports.validateRole = async (req, res, next) => {
  var user = await User.findById(req.user.sub);
  if (user.roles.indexOf('admin')) {
    return res.status(403).json({ status: 403., message: 'Permissões insuficientes'});
  }
  next();
}