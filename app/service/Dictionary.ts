import { Service } from 'egg';

interface DictionaryContentData {
  code: string;
  name: string;
}

interface DictionaryData {
  _id?: string;
  code: string;
  name: string;
  desc?: string;
  content: DictionaryContentData[];
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

  public async getDictionaryById(_id: string) {
    return await this.ctx.model.Dictionary.findOne({ _id });
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

  public async addDictionaryContent(_id: string, params: DictionaryContentData) {
    const result = await this.getDictionaryById(_id);
    console.log(result, params);
    result.content.push(params);
    return await this.updateDictionary(_id, result);
  }

  public async updateDictionaryContent(_id: string, contentId: string, params: DictionaryContentData) {
    const result = await this.getDictionaryById(_id);
    const doc = result.content.id(contentId);
    const index = result.content.indexOf(doc);
    result.content.splice(index, 1, params);
    return await this.updateDictionary(_id, result);
  }

  public async delDictionaryContent(_id: string, contentId: string) {
    const result = await this.getDictionaryById(_id);
    const doc = result.content.id(contentId);
    const index = result.content.indexOf(doc);
    result.content.splice(index, 1);
    return await this.updateDictionary(_id, result);
  }
}
