const {pool} = require('../../../configs/db')


 async function insertDatas (data, table){
   try {
    const iterator =  data.map(item =>  ` ( '${item}'` + `, '${id}'  )`)
    const dataInsert = iterator.toString().replace("[", "").replace("]", "")

    console.log('ESTE ES EL CONVERT DE LOS ID de inserción de datos-->', dataInsert)
  
    const responReq = await (await pool.query(`INSERT INTO ${table} values(${dataInsert}) RETURNING *`)).rows
        return responReq    
   
    } catch (error) {
       return error
   }
   
}

 async  function getAllDatas(table){
    try {
    const responReq = await(await pool.query(`SELECT * from ${table}`)).rows    
    return responReq
    } catch (error) {
     return error
    }
}
 async function getAllForDeviceId (id, table){
    try {
      const responReq = await pool.query(`SELECT * from ${table} where device_id = $1`, [id])
        return responReq
    } catch (error) {
        return error
    }
}

 async function getSingleData (table,  id) {
    try {
        const responReq = await pool.query(`SELECT * from ${table} where id = $1`, [id])
          return responReq
      } catch (error) {
          return error
      }
}
module.exports = {
    insertDatas,
    getAllDatas,
    getAllForDeviceId,
    getSingleData
}