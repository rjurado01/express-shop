import {IRouter} from 'express'
import {ProfileShowController} from './controllers/profile-show.controller'
import {SessionsCreateController} from './controllers/sessions-create.controller'
import {container} from '../di-container'

const authRouter = {
  register: (router: IRouter) => {
    const createSessionController = container.get(SessionsCreateController)
    const profileShowController = container.get(ProfileShowController)

    router.post('/sessions', createSessionController.run.bind(createSessionController))
    router.get('/profile', profileShowController.run.bind(profileShowController))
  },
}

export {authRouter}
