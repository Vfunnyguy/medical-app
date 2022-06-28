import db from "../models/index";

    export var getTopDoctor=(limitIn)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                var users=await db.User.findAll({
                    limit:limitIn,
                    where:{roleID:'R2'},
                    order:[['createdAt','DESC']],
                    attributes:{
                        exclude:['password']
                    },
                    include:[
                        {model:db.Code,as:'positionData',attributes:['value_vi']},
                        {model:db.Code,as:'genderData',attributes:['value_vi']}
                    ],
                    raw:true,
                    nest:true
                    
                })
                resolve({
                    errCode:0,
                    data:users
                })
            } catch (error) {
                reject(error);
            }
        })
    }
