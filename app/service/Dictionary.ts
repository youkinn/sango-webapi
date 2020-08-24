import { Service } from 'egg';

/**
 * Dictionary Service
 */
export default class Dictionary extends Service {
  public async getDictionaryList({ page = 1, pageSize = 10 }) {
    return await this.ctx.model.Dictionary.find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ _id: -1 });
  }

  public async getDictionaryCount(params: { code: string; name: string }) {
    return await this.ctx.model.Dictionary.find({}).count(params);
  }

  public async addDictionary(preload) {
    return await this.ctx.model.Dictionary.create(preload);
  }
}
