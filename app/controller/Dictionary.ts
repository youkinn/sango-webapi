import BaseController from './Base';

export default class DictionaryController extends BaseController {
  public async getDictionaryList() {
    const { code, name, page, pageSize } = this.ctx.query;
    const params = { page: +page, pageSize: +pageSize };
    const [count, results] = await Promise.all([
      this.ctx.service.dictionary.getDictionaryCount({ code, name }),
      this.ctx.service.dictionary.getDictionaryList(params)
    ]);
    this.success({
      count,
      results
    });
  }

  public async addDictionary() {
    const { ctx, app } = this;
    const params = ctx.request.body;
    const errors = app.validator.validate(
      {
        code: 'string',
        name: 'string'
      },
      params
    );
    if (errors) {
      return this.validateFailed(errors);
    }
    const { code, name, desc } = params;
    const result = await ctx.service.dictionary.addDictionary({ code, name, desc });
    this.success(result);
  }
}
