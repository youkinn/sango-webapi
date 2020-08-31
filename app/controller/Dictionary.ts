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
    const [ count, results ] = await Promise.all([
      this.ctx.service.dictionary.getDictionaryCount(params),
      this.ctx.service.dictionary.getDictionaryList(params, page, pageSize),
    ]);
    this.success({
      count,
      results,
    });
  }

  public async checkDictionaryExist() {
    const { ctx } = this;
    const { _id, code } = this.ctx.query;
    const count = await this.ctx.service.dictionary.checkDictionaryCodeExist({ _id, code });
    ctx.state = 200;
    ctx.body = {
      success: true,
      data: count
    };
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

  public async getDictionaryContentList() {
    const _id = this.ctx.params.dictionaryId;
    const results = await this.ctx.service.dictionary.getDictionaryById(_id);
    this.success({
      count: results.content.length,
      results: results.content,
    });
  }

  public async addDictionaryContent() {
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
    const _id = this.ctx.params.dictionaryId;
    await ctx.service.dictionary.addDictionaryContent(_id, params);
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: '操作成功'
    };
  }

  public async updateDictionaryContent() {
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
    const _id = this.ctx.params.dictionaryId;
    const contentId = this.ctx.params.contentId;
    await ctx.service.dictionary.updateDictionaryContent(_id, contentId, params);
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: '操作成功'
    };
  }

  public async delDictionaryContent() {
    const { ctx } = this;
    const _id = this.ctx.params.dictionaryId;
    const contentId = this.ctx.params.contentId;
    await this.ctx.service.dictionary.delDictionaryContent(_id, contentId);
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: '操作成功'
    };
  }
}
