
import db from '../models/index';
import {
  createdNewUser,
  getUserInfo,
  getUserbyId,
  updateUserData,
  deleteUser,
} from '../service/service__Crud';
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render('homepage.ejs', {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

var getCrudPage = (req, res) => {
  return res.render('crudpage.ejs');
};
const postCRUD = async (req, res) => {
  var result = await createdNewUser(req.body);
  console.log(result);
  return res.send('post to server');
};
let getCRUD = async (req, res) => {
  try {
    let user = await getUserInfo();

    return res.render('getUser.ejs', {
      userTable: user,
    });
  } catch (error) {
    console.log(error);
  }
};

async function editCRUD(req, res) {
  let uID = req.query.id;

  if (uID) {
    let uData = await getUserbyId(uID);

    return res.render('editUser.ejs', {
      userInfo: uData,
    });
  } else {
    return res.render('404.ejs')
  }
}
var putCRUD = async (req, res) => {
  let data = req.body;
  await updateUserData(data);
  return res.send('update success');
};
const deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
      await deleteUser(id);

    return res.send('delete success');
  }else{
    return res.render('404.ejs')
  }
};
module.exports = {
  getHomePage: getHomePage,
  getCrudPage: getCrudPage,
  postCRUD: postCRUD,
  getCRUD: getCRUD,
  editCRUD: editCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
