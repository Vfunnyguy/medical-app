const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('medical-web', 'root', null, {
  host: 'localhost',
  dialect: 'mysql' ,
  logging:false
});
var connectDb=async()=>{
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully to MySql 🐬.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}
module.exports=connectDb