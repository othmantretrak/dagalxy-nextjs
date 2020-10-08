const mongoose = require("mongoose");
import { Cat } from "./Cat";
const Schema = mongoose.Schema;
const articleSchema = new Schema({
  title: String,
  slug: String,
  cat: { type: Schema.Types.ObjectId, ref: Cat },
  content: String,
  tags: [String],
  excerpt: String,
  author: { type: String, default: "zaaim" },
  imgUri: String,
  createdAt: { type: String, default: Date.now },
});
export const Article =
  mongoose.models.Article || mongoose.model("Article", articleSchema);
//module.exports = mongoose.model('Article', articleSchema);
