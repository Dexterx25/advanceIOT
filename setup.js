'use strict'
const inquirer = require('inquirer')
const db = require('./')
const config = require('./config')
const {handleErrorResponse, handleSuccesResponse} = require('./lib/utils/console_responses')

let procedence = '[SETUP]'
const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your database, are you sure?'
    }
  ])

  if (!answer.setup) {
    return console.log('Ok, nothing will hapend:)')
  }
  await db(config)
  .then(handleSuccesResponse)
  .catch(handleErrorResponse)
}

setup()
