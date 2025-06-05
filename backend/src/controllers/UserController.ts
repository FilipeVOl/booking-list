const { validationResult } = require('express-validator');
const UserService = require('../services/UserService');

class UserController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { user, token } = await UserService.createUser(req.body);
      res.status(201).json({ user, token });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const { user, token } = await UserService.login(email, password);
      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController(); 