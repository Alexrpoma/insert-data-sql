import readline from 'readline'
import fs from 'fs'
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('edbase', 'alex', 'alex', {
  host: '127.0.0.1',
  dialect: 'postgres'
})

const insertOwners = async () => {

  await sequelize.authenticate();
  const file = readline.createInterface(fs.createReadStream('OWNERS.csv'))


  //Slow method
  /* file.on('line', async (line) => {
    await sequelize.query({
      query: 'INSERT INTO owner (first_name, last_name, email) VALUES (?,?,?)',
      values: line.split(',')
    })
  }) */

  //Fast method
  const owners = []
  file.on('line', async (line) => {
    owners.push(line.split(','))
  })

  file.on('close', async () => {
    await sequelize.query({
      query: 'INSERT INTO owner (first_name, last_name, email) VALUES ?',
      values: [owners]
    })
  })

}

insertOwners()