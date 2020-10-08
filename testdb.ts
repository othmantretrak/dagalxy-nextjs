//const connectDBp = require("./config/db");
import connectDBp from "./config/db";
const { Cat } = require("./models/Cat");
const { Article } = require("./models/Article");

const getpost = async () => {
  try {
    await connectDBp();
    let article = await Article.findOne({
      slug: "actress-yuko-takeuchi-dies-in-apparent-suicide",
    }).populate("cat");
    const articlecat = await Cat.findOne({ _id: article.cat.id })
      .populate("articles")
      .slice(6);
    article.cat.articles = articlecat.articles;
    console.log(article.cat.articles);
    const res = JSON.parse(JSON.stringify(article));

    return res;
  } catch (e) {
    console.log("error mongo", e);
  }
};
getpost();
