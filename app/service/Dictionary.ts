import { Service } from 'egg';

interface DictionaryData {
  _id?: string;
  code: string;
  name: string;
  desc?: string;
  creator_uid?: number;
  creator_name?: string;
  created_at: number;
  last_modifier_uid?: number;
  last_modifier_name?: string;
  modified_at: number;
}

/**
 * Dictionary Service
 */
export default class Dictionary extends Service {
  public async getDictionaryList(params, page = 1, pageSize = 10) {
    return await this.ctx.model.Dictionary.find(params)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ modified_at: -1 });
  }

  public async getDictionaryCount(params = {}) {
    return await this.ctx.model.Dictionary.count(params);
  }

  public async addDictionary(params) {
    const preload: DictionaryData = params;
    const nowTime = new Date().getTime();
    preload.created_at = nowTime;
    preload.modified_at = nowTime;
    return await this.ctx.model.Dictionary.create(params);
  }

  public async updateDictionary(_id: string, params: DictionaryData) {
    const preload: DictionaryData = params;
    preload.modified_at = new Date().getTime();
    return await this.ctx.model.Dictionary.findOneAndUpdate({ _id }, preload);
  }

  public async delDictionary(_id: string) {
    return await this.ctx.model.Dictionary.findOneAndRemove({ _id });
  }
}
