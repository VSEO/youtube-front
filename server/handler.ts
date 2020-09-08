'use strict'

import { Request, Response, NextFunction } from 'express'
import { APIGatewayEvent, Context } from 'aws-lambda'

export {}

const AWS = require('aws-sdk')
const awsServerlessExpress = require('aws-serverless-express')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const express = require('express')
const session = require('express-session')
const DynamoDBStore = require('connect-dynamodb')(session)
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const { Nuxt } = require('nuxt')
const { headerMiddleware } = require('./middleware/header')
const { requestMiddleware } = require('./middleware/request')

const config = require('../nuxt.config')
const nuxt = new Nuxt(Object.assign(config, { _start: true }))

const app = express()
app.set('trust proxy', 1)
app.use(headerMiddleware)
app.use(requestMiddleware)
app.use(bodyParser.json())
app.use(session(Object.assign({
  store: new DynamoDBStore({
    table: config.env.aws.dynamodb.table,
    client: new AWS.DynamoDB()
  })
}, config.env.session)))
app.use(cookieParser())

// Init apis
const auth = require('./api/auth')
auth.use(awsServerlessExpressMiddleware.eventContext())
app.use('/api/auth', auth)

app.use(async (req: Request, res: Response, next: NextFunction) => {
  await nuxt.ready()
  nuxt.render(req, res, next)
})

const server = awsServerlessExpress.createServer(app)

module.exports.handler = (event: APIGatewayEvent, context: Context) => {
  awsServerlessExpress.proxy(server, event, context)
}
