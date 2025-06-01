
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import exitsHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb.js'
import { env } from '~/config/environment.js'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware.js'
import e from 'express'

const START_SEVER = () => {

  const app = express()

  app.use(express.json())
  app.use('/v1', APIs_V1)


  // Handle error
  app.use(errorHandlingMiddleware)


  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello Vuong Dev, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })

  exitsHook(() => {
    CLOSE_DB()
    console.log('MongoDB connection closed.');
  })
}
(async () => {
  try {
    console.log('Connecting to the database...')
    await CONNECT_DB()
    // eslint-disable-next-line no-console
    console.log('Connected to the database successfully')

    START_SEVER()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error connecting to the database:', err)
    process.exit(1) // Exit the process with a failure code
  }
})()
// CONNECT_DB().then(() => console.log("Connected")).then(() => START_SEVER()).catch((err) => {
//   // eslint-disable-next-line no-console
//   console.error('Error connecting to the database:', err)
//   process.exit(0) // Exit the process with a failure code
// })


