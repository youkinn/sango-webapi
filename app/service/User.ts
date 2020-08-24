import { Service } from 'egg';

/**
 * User Service
 */
export default class User extends Service {
  public async getUserList({ page = 1, pageSize = 10 }) {
    return await this.ctx.model.User.find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ _id: -1 });
  }

  public async addUser(preload) {
    return await this.ctx.model.User.create(preload);
  }
}
