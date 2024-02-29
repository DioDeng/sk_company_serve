const bcrypt = require("bcryptjs");
const validator = require("validator");
const resSuccess = require("../service/resSuccess");
const appError = require("../service/appError");
const { generateSendJWT } = require("../middleware/auth");
const Admin = require("../models/Admin");

const admins = {
  // 註冊
  async signUp(req, res, next) {
    const { account, password, phone } = req.body;

    // 欄位未填寫正確
    if ( !account || !password ) {
      return next(appError(400, "欄位未填寫正確！", next));
    }

    // 密碼需為 6 個字元以上
    if (!validator.isLength(password, { min: 8 })) {
      return next(appError(400, "密碼需為 8 個字元以上！", next));
    }
    
    // 不開放註冊
    const checkAccountUnique = await Admin.findOne({ account });
    if (checkAccountUnique || !checkAccountUnique) {
      return next(appError(400, "YA HA！", next));
    }

    // 驗證手機格式
    // const phoneNumber = /^(09)[0-9]{8}$/;
    // if(!phoneNumber.test(phone)) {
    //   return next(appError(400, "手機 格式不正確！", next));
    // }

    // 驗證 phone 是否已被使用
    // const checkPhoneUnique = await Admin.findOne({ phone });
    // if(checkPhoneUnique) {
    //   return next(appError(400, "此 手機號碼 已被使用！", next));
    // }

    // 將密碼加密
    const newPassword = await bcrypt.hash(password, 12);
    
    const newAdmin = await Admin.create({
      account,
      phone,
      password: newPassword,
    });
    generateSendJWT(res, 201, newAdmin);
  },
  // 登入
  async signIn(req, res, next) {
    const { account, password } = req.body;

    // 欄位未填寫正確
    if (!account || !password) {
      return next(appError(400, "欄位未填寫正確！", next));
    }

    // 取出 user 資料庫的指定資料
    const user = await Admin.findOne({ account }).select("+password");

    // 看此 Email 是否已註冊
    if (!user) {
      return next(appError(400, "帳號錯誤！", next));
    }

    // 比對密碼是否相符
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return next(appError(400, "密碼錯誤！", next));
    }

    generateSendJWT(res, 200, user);
  },
  // 重設密碼
  async updatePassword(req, res, next) {
    const { password, confirmPassword } = req.body;

    // 欄位未填寫正確
    if (!password || !confirmPassword) {
        return next(appError(400, "欄位未填寫正確！", next));
      }
  
    // 密碼與確認密碼不符合
    if (password !== confirmPassword) {
        return next(appError(400, "密碼不一致！", next));
      }
    // 將密碼加密
    const newPassword = await bcrypt.hash(password, 12);

    // 更新資料庫中密碼
    const newUser = await Admin.findByIdAndUpdate(req.user._id, {
        password: newPassword,
      });
  
      generateSendJWT(res, 200, newUser);
  },
};

module.exports = admins;