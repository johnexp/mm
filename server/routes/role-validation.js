let guard = require('express-jwt-permissions')();

var RoleValidation = function () { }

RoleValidation.prototype = {
  validateRoleOptional: (permission) => {
    return _middleware.bind(this)

    function _middleware(req, res, next) {
      if (req.user.roles.indexOf('admin') > -1) {
        next();
        return;
      }
      return guard.check(permission)(req, res, next);
    }
  },
  validateRole: (req, res, next) => {
    if (req.user.roles.indexOf('admin') > -1) {
      next();
      return;
    }
    return res.status(403).json({ status: 403, message: 'Permissões insuficientes' });
  }
}

module.exports = function () {
  return new RoleValidation();
}
