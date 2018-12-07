import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { ARTICLE_MODEL, SERVER_CONFIG } from '../../server.constants';
import { IArticle } from './interfaces/article.interface';
import { isEmptyObject } from '../../common/helpers/utils';

import { parseImageURL } from '../../common/helpers/converters';
@Injectable()
export class ArticlesService {
  constructor(@Inject(ARTICLE_MODEL) private readonly articleModel: Model<IArticle>) {}

  async create(article) {
  	return await this.articleModel.create({ title: article.title, content: article.content });
  }

  async list() {
  	return await this.articleModel.find();
  }

  async update(article, body) {
  	article.title = body.title;
  	article.content = body.content;
	return await article.save();
  }

  async delete(article) {
  	return await article.remove();
  }
}
