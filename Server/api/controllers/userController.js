import { handleUserLogin ,getAllUser,createUser,editUser,deleteUser,getCode} from "../service/service__User";

export const handleLogin = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: 'Email or password is empty',
    });
  }
  let userData = await handleUserLogin(email, password);
  return res.status(200).json({
    errCode:userData.errCode,
    message:userData.errMessage,
    user:userData.user?userData.user:{}
  });
};
export const handleGetAllUser = async (req, res) => {
  var id=req.query.id
  if(!id){
    return res.status(500).json({
      errCode:1,
      errMessage:'Not found param',
      userData:[]
    })
  }
  let userData = await getAllUser(id);
  return res.status(200).json({
    errCode:0,
    errMessage:"Get all user success",
    userData
  })
};
export async function handleCreateUser(req,res){
 let user=await createUser(req.body)
 return res.status(200).json({
   user
 })
} 
export var handleEditUser = async (req, res) => {
 let data=req.body
 let message=await editUser(data)
 return res.status(200).json({
  //  errCode:0,
   errMessage:message
 })
}
export let handleDeleteUser = async (req, res) => {

  if(!req.body.id){
    return res.status(500).json({
      errCode:1,
      errMessage:'Not found param',
    })
  }
  let result=await deleteUser(req.body.id)
  return res.status(200).json({result})
}
export let getCodeApi = async (req, res) => {
  try {
    let data=await getCode(req.query.type)
    return res.status(200).json(data)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      errCode:1,
      errMessage:'Server error',
    }) 
  }
}