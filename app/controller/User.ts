import BaseController from './Base';

export default class UserController extends BaseController {
  public async getUserList() {
    const result = await this.ctx.service.user.getUserList();
    this.success({
      count: 10,
      results: result
    });
  }

  public async addUser() {
    const { ctx, app } = this;
    const params = ctx.request.body;
    const errors = app.validator.validate(
      {
        name: 'string',
        age: 'number'
      },
      params
    );
    if (errors) {
      return this.validateFailed(errors);
    }
    const { name } = params;
    const result = await ctx.service.user.addUser({ name });
    this.success(result);
  }
}
