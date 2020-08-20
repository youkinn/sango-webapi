import BaseController from './Base';

export default class HomeController extends BaseController {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }
}
