const debug = require('debug')('platziverse:db:setup')
const config = {
    database_types_sheme:{
        squelize:false,
        postgress:true,
        mysql:false
    },
    DBconfigPSQL:{
      user: process.env.DB_USER_PSQL || 'development_user',   
      password: process.env.DB_PASS_PSQL || 'developmet_pass',
      host: process.env.DB_PASS_PSQL || 'localhost',
      database: process.env.DB_NAME_PSQL || 'development_db'
    },
    DBconfigMYSQL:{
      user: process.env.DB_USER_MYSQL || 'development_user',   
      password: process.env.DB_PASS_MYSQL || 'developmet_pass',
      host: process.env.DB_PASS_MYSQL || 'localhost',
      database: process.env.DB_NAME_MYSQL || 'development_db'

       },
    database: process.env.DB_NAME || 'development_db',
    username: process.env.DB_USER || 'development_user',
    password: process.env.DB_PASS || 'developmet_pass',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }

module.exports = config