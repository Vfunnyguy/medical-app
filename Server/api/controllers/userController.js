import { handleUserLogin } from "../service/service__User";

export const handleLogin = async (req, res) => {
  var { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      err: 1,
      message: 'Email or password is empty',
    });
  }
  let userData = await handleUserLogin(email, password);
  return res.status(200).json({
    err:userData.err,
    msg:userData.msg,
    userData
  });
};
