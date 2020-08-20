import { Controller } from 'egg';

export default class BaseController extends Controller {
  success(data) {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = {
      success: true,
      data
    };
  }

  validateFailed(data) {
    const { ctx } = this;
    ctx.status = 400;
    ctx.body = {
      success: false,
      data
    };
  }
}
