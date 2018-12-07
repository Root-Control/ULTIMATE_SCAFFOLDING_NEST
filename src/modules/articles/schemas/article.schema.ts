import { Schema } from 'mongoose';

export const ArticleSchema: Schema = new Schema({
  created: {
    type: Date,
    default: new Date()
  },
  title: {
    type: String,
    required: 'Title cannot be blank'
  },
  content: {
    type: String,
    default: ''
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

ArticleSchema.post('save', async function (article) {
  console.log('article saved or updated');
});  
