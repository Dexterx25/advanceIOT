'use strict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')

//actions-db ====>
 //-->squelize
 const setupAgent = require('./lib/actions_db/sequelize/agent')
 const setupMetric = require('./lib/actions_db/sequelize/metric')
 //-->postgress
 const setupAgentPSQL = require('./lib/actions_db/sequelize/agent')
 const setupMetricPSQL = require('./lib/actions_db/sequelize/metric')
 //-->mysql
 const setupAgentMYSQL = require('./lib/actions_db/sequelize/agent')
 const setupMetricMYSQL = require('./lib/actions_db/sequelize/metric')
/////////////////// 
const defaults = require('defaults')

const {handleSuccesResponse, handleErrorResponse} = require('./lib/utils/console_responses')

module.exports = async function (config) {
  let procedence = '[INDEX SETUP]'
  config = defaults(config, 
    {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
    
    }
  )
if(config.database_types_sheme.postgress){
    handleSuccesResponse('This Proyect use natives models sql postgress schema into models/db.sql', procedence)
  }
if(config.database_types_sheme.mysql){
  handleSuccesResponse('This Proyect use natives models sql mysql schema into models/db.sql', procedence) 
}

handleSuccesResponse('This Proyect use sequelize models into models/agent.js and models/metric.js', procedence) 


  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)

  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }
  let Agent 
  let Metric

  if(config.database_types_sheme.postgress || config.database_types_sheme.mysql){
     Agent = config.database_types_sheme.postgress == true ?  setupAgentPSQL(AgentModel) : setupAgentMYSQL()
     Metric = config.database_types_sheme.postgress == true ? setupMetricPSQL(MetricModel, AgentModel) : setupMetricMYSQL(MetricModel, AgentModel)  
  }else{
     Agent = setupAgent(AgentModel)
     Metric = setupMetric(MetricModel, AgentModel)    
  }
  return {
    Agent,
    Metric
  }
}
