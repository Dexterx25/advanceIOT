const { Pool } = require('pg') 
const config = require('./index');
const {handleErrorResponse, handleSuccesResponse} = require('../lib/utils/console_responses')
const pool =  new Pool(config.DBconfigPSQL);
const connection = mysql.createConnection(config.DBconfigMYSQL)
connection.connect((err)=>{
    if(err){
      handleErrorResponse(err)
    }
    handleSuccesResponse('Success Connection to MYSQL!!')
})
module.exports = {
    pool,
    connection
}