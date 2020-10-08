import { Article } from "./Article";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const catSchema = new Schema({
  title: String,
  slug: String,
  articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
});

export const Cat = mongoose.models.Cat || mongoose.model("Cat", catSchema);

//module.exports = mongoose.model('Cat', catSchema);
