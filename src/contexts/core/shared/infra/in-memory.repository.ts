import {CriteriaOrder} from '../domain/criteria'

interface Criteria {
  filter?: {
    id?: string
  }

  page?: {
    size?: number
    number?: number
  }

  order?: {
    field: string
    dir: CriteriaOrder
  }
}

interface Entity {
  id: string
}

export abstract class InMemoryRepository<E extends Entity, C extends Criteria> {
  protected items: E[] = []

  findAll(query?: C | undefined): Promise<E[]> {
    let result = this.items.map(item => item) // avoid reference

    if (query?.filter) result = this.applyFilter(query.filter, result)
    if (query?.page) result = this.applyPagination(query.page, result)
    if (query?.order) result = this.applyOrder(query.order, result)

    return Promise.resolve(result)
  }

  findOne(filter: C['filter']): Promise<E | null> {
    const item = this.applyFilter(filter, this.items)[0]

    return Promise.resolve(item || null)
  }

  count(filter: C['filter'] | undefined): Promise<number> {
    const items = filter ? this.applyFilter(filter, this.items) : this.items

    return Promise.resolve(items.length)
  }

  async create(user: E): Promise<void> {
    this.items.push(user)
  }

  async update(user: E): Promise<void> {
    this.items.splice(this.findIndex(user), 1, user)

    return Promise.resolve()
  }

  async delete(user: E): Promise<void> {
    this.items.splice(this.findIndex(user), 1)

    return Promise.resolve()
  }

  async clear() {
    this.items = []
  }

  protected abstract applyFilter(filter: C['filter'], items: E[]): E[]

  protected applyOrder(order: C['order'], items: E[]): E[] {
    if (!order) return items

    const dirValue = order.dir === CriteriaOrder.Asc ? 1 : -1

    return items.sort((a: Record<string, any>, b: Record<string, any>) => {
      if (a[order.field] > b[order.field]) return dirValue
      if (a[order.field] < b[order.field]) return dirValue * -1

      return 0
    })
  }

  protected applyPagination(page: C['page'], items: E[]): E[] {
    const number = (page?.number || 1) - 1
    const size = page?.size || 5

    return items.slice(size * number, size * (number + 1))
  }

  protected abstract notFound(filter: C['filter']): void

  protected findIndex(user: E): number {
    const index = this.items.findIndex(item => item.id === user.id)

    if (index < 0) this.notFound({id: user.id})

    return index
  }
}
