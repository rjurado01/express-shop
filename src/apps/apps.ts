import 'reflect-metadata'

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import Router from 'express-promise-router'
import {NotFoundError} from '../contexts/core/shared/domain/not-found.error'
import {ClassValidationError} from '../lib/class-attrs/validation/attr-error'
import {registerWebApiRoutes} from './web-api/routes'
import {registerBackOfficeApiRoutes} from './backoffice-api/routes'

const app = express()
const webRouter = Router()
const backOfficeRouter = Router()
const port = 3000

app.use(bodyParser.json()) // must go before router
app.use(cors())
app.use(webRouter)
app.use('/backoffice', backOfficeRouter)

webRouter.get('/', (_req, res) => {
  res.send('Hello World 2!')
})

registerWebApiRoutes(webRouter)
registerBackOfficeApiRoutes(backOfficeRouter)

webRouter.use((err: unknown, _req: any, res: any, _next: unknown) => {
  if (err instanceof ClassValidationError) {
    res.status(422).send({errors: err.errors})
  } else if (err instanceof NotFoundError) {
    res.status(404).send(err)
  } else {
    // eslint-disable-next-line no-console
    console.dir(err)

    res.status(500).send('Something broke!')
  }
})

webRouter.use('/uploads', express.static('uploads'))

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`)
})
