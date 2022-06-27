import {
  handleUserLogin,
  getAllUser,
  createUser,
  editUser,
  deleteUser,
  getCode,
} from '../service/service__User';

const userControl = {
  handleLogin: async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({
        errCode: 1,
        message: 'Email or password is empty',
      });
    }
    let userData = await handleUserLogin(email, password);
    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.errMessage,
      user: userData.user ? userData.user : {},
    });
  },
  handleGetAllUser: async (req, res) => {
    var id = req.query.id;
    if (!id) {
      return res.status(500).json({
        errCode: 1,
        errMessage: 'Not found param',
        userData: [],
      });
    }
    let userData = await getAllUser(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: 'Get all user success',
      userData,
    });
  },
  handleCreateUser: async (req, res) => {
    let user = await createUser(req.body);
    return res.status(200).json({
      user,
    });
  },
  handleEditUser: async (req, res) => {
    let data = req.body;
    let message = await editUser(data);
    return res.status(200).json({
      //  errCode:0,
      message
    });
  },
  handleDeleteUser: async (req, res) => {
    if (!req.body.id) {
      return res.status(500).json({
        errCode: 1,
        errMessage: 'Not found param',
      });
    }
    let result = await deleteUser(req.body.id);
    return res.status(200).json({ result });
  },
  getCodeApi: async (req, res) => {
    try {
      let data = await getCode(req.query.type);
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        errCode: 1,
        errMessage: 'Server error',
      });
    }
  },
};
export default userControl

