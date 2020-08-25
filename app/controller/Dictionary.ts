import BaseController from './Base';

export default class DictionaryController extends BaseController {
  public async getDictionaryList() {
    let { page, pageSize } = this.ctx.query;
    const { code, name } = this.ctx.query;
    const params: { code?: string; name?: string } = {};

    // todo：参数处理好恶心、待修改
    if (code) {
      params.code = code;
    }
    if (name) {
      params.name = name;
    }
    if (page) {
      page = parseInt(page);
    }
    if (pageSize) {
      pageSize = parseInt(pageSize);
    }
    const [count, results] = await Promise.all([
      this.ctx.service.dictionary.getDictionaryCount(params),
      this.ctx.service.dictionary.getDictionaryList(params, page, pageSize),
    ]);
    this.success({
      count,
      results,
    });
  }

  public async createDictionary() {
    const { ctx, app } = this;
    const params = ctx.request.body;
    const errors = app.validator.validate(
      {
        code: 'string',
        name: 'string',
      },
      params
    );
    if (errors) {
      return this.validateFailed(errors);
    }
    const result = await ctx.service.dictionary.addDictionary(params);
    this.success(result);
  }

  public async updateDictionary() {
    const { ctx, app } = this;
    const _id = ctx.params.id;
    const params = ctx.request.body;
    const errors = app.validator.validate(
      {
        code: 'string',
        name: 'string',
      },
      params
    );
    if (errors) {
      return this.validateFailed(errors);
    }
    const result = await ctx.service.dictionary.updateDictionary(_id, params);
    this.success(result);
  }

  public async delDictionary() {
    const { ctx, app } = this;
    const _id = ctx.params.id;
    const errors = app.validator.validate(
      {
        _id: 'string',
      },
      { _id }
    );
    if (errors) {
      return this.validateFailed(errors);
    }
    const result = await ctx.service.dictionary.delDictionary(_id);
    this.success(result);
  }
}
