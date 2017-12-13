exports.validateRole = (req, res, next) => {
  if (req.user.roles.indexOf('admin')) {
    return res.status(403).json({ status: 403., message: 'Permissões insuficientes'});
  }
  next();
}