import { Router, Request, Response } from 'express'
import { AxiosResponse } from 'axios'

const axios = require('axios')
const express = require('express')
const router: Router = express.Router()
const config = require('config')

router.post('/login', (req, res) => {
  const form = { id: req.body.id, password: req.body.password }
  axios.post('/auth/login', form, { baseURL: config!!.endpoint!!.backend!! })
    .then(({ data }: AxiosResponse) => {
      const authUser = {
        id: data!!.data!!.id!!,
        role: data!!.data!!.role!!,
        token: data!!.data!!.token!!
      }
      req.session!!.authUser = authUser
      res.json(authUser)
    })
    .catch(() => res.status(400).json({ message: 'Authentication failure' }))
})

router.post('/logout', (req: Request, res: Response) => {
  delete req.session!!.authUser
  res.json({ message: 'Logout'})
})

module.exports = router
