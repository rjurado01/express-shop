import {Service} from 'diod'
import {Request, Response} from 'express'
import {ShowStatsService} from '../use-cases/show/show-stats.use-case'

@Service()
export class StatsShowController {
  constructor(private service: ShowStatsService) {}

  async run(_req: Request, res: Response) {
    const result = await this.service.run()

    res.send(result)
  }
}
