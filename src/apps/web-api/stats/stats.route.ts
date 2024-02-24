import {IRouter} from 'express'
import {StatsShowController} from './controllers/stats-show.controller'
import {container} from '../di-container'

const generalRouter = {
  register: (router: IRouter) => {
    const statsShowController = container.get(StatsShowController)

    router.get('/stats', statsShowController.run.bind(statsShowController))
  },
}

export {generalRouter}
