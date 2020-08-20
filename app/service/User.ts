import { Service } from 'egg';

/**
 * User Service
 */
export default class User extends Service {
  public async getUserList() {
    return await this.ctx.model.User.find({});
  }

  public async addUser(preload) {
    return await this.ctx.model.User.create(preload);
  }
}
