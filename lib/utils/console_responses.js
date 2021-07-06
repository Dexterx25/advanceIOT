const chalk = require('chalk')

function handleErrorResponse (err, procedence) {
    console.error(`${chalk.red(`[fatal error] <===> [${procedence}] =====> `)} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
  }
  function handleSuccesResponse (res, procedence) {
    console.log(`${chalk.green(`[Success Response] <==> [${procedence}] =====> `)} ${res}`)
    console.log(err.stack)
  }

  module.exports = {
      handleErrorResponse,
      handleSuccesResponse,
  }