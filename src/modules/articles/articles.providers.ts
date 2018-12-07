import { Connection } from 'mongoose';
import { ArticleSchema } from './schemas/article.schema';
import { ARTICLE_MODEL, DB_CONNECTION_TOKEN } from '../../server.constants';

export const articleProviders = [
  {
    provide: ARTICLE_MODEL,
    useFactory: (connection: Connection) => connection.model('Article', ArticleSchema),
    inject: [DB_CONNECTION_TOKEN],
  },
];