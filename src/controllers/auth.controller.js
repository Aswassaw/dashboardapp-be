const bcrypt = require("bcrypt");
const authModel = require("../models/auth.model");
const jwtToken = require("../utils/generateJwtToken");
const { success, failed } = require("../utils/createResponse");

module.exports = {
  register: async (req, res) => {
    try {
      const user = await authModel.selectByUsername(req.body.username);
      if (user.rowCount) {
        failed(res, {
          code: 403,
          payload: "Email already exist",
          message: "Register Failed",
        });
        return;
      }

      const passwordHashed = await bcrypt.hash(req.body.password, 10);

      await authModel.register({
        username: req.body.username,
        password: passwordHashed,
      });

      success(res, {
        code: 201,
        payload: null,
        message: "Register Success",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
  login: async (req, res) => {
    try {
      const user = await authModel.selectByUsername(req.body.username);
      if (user.rowCount) {
        const match = await bcrypt.compare(
          req.body.password,
          user.rows[0].password
        );

        if (match) {
          const jwt = await jwtToken({
            id: user.rows[0].id,
          });

          success(res, {
            code: 200,
            payload: null,
            message: "Login Success",
            token: { jwt },
          });
          return;
        }
      }

      failed(res, {
        code: 401,
        payload: "Wrong Email or Password",
        message: "Login Failed",
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: "Internal Server Error",
      });
    }
  },
};
