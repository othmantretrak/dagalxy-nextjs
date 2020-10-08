import { useState } from "react";
import connectDB from "../config/db";
import { Article } from "../models/Article";
import { Cat } from "../models/Cat";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import RelatedPost from "../components/related";
import GoogleAd from "../components/GoogleAd";
import InArticleAd from "../components/inArticleAd";
import Share from "../components/Share";
import { FacebookProvider, Like } from "react-facebook";

import { category } from "./category/[slug]";

//const { BLOG_URL, CONTENT_API_KEY } = process.env

async function getPost(slug: string) {
  try {
    await connectDB();
    let article = await Article.findOne({ slug: slug }).populate("cat");
    const articlecat = await Cat.findOne({
      _id: article.cat.id,
    }).populate({ path: "articles", options: { limit: 6 } });
    article.cat.articles = articlecat.articles;
    //console.log(article.cat.articles);
    const res = JSON.parse(JSON.stringify(article));

    return res;
  } catch (e) {
    console.log("error mongo", e);
  }
}

// Ghost CMS Request
export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  return {
    props: { post },
    revalidate: 10,
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export type Post = {
  title: string;
  html: string;
  slug: string;
  tags: [string];
  imgUri: string;
  author: string;
  cat: category;
  excerpt: string;
  content: string;
  id: string;
};

const Post: React.FC<{ post: Post }> = (props) => {
  const { post } = props;
  const related = post.cat.articles;
  //console.log(props);

  const [enableLoadComments, setEnableLoadComments] = useState<boolean>(true);

  const router = useRouter();
  console.log(router.query);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  function loadComments() {
    setEnableLoadComments(false);
    (window as any).disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = post.slug;
    };

    const script = document.createElement("script");
    script.src = "https://ghostcms-nextjs.disqus.com/embed.js";
    script.setAttribute("data-timestamp", Date.now().toString());

    document.body.appendChild(script);
  }

  return (
    <Layout>
      <div className="wrap blog">
        <h1>{post.title}</h1>
        <div className="thumb">
          <picture>
            <source
              media="(min-width: 1200px)"
              srcSet={`${post.imgUri}?w=800&fit=fill&fm=webp`}
              type="image/webp"
            />
            <source
              media="(min-width: 992px)"
              srcSet={`${post.imgUri}?w=600&fit=fill&fm=webp`}
              type="image/webp"
            />

            <img
              src={`${post.imgUri}?w=400&fit=fill&fm=webp`}
              alt={post.title}
            />
          </picture>
        </div>

        <div className="badgelist">
          <div>
            <span>Category: </span>
            <Link href="/category/[slug]" as={`/category/${post.cat.slug}`}>
              <a>
                <p className="badge">{post.cat.title}</p>
              </a>
            </Link>
          </div>
          <p className="badge">{post.author}</p>
        </div>
        <div className="content">
          <p
            dangerouslySetInnerHTML={{
              __html: post.excerpt,
            }}
          />
          <div className="ads1">{/* <GoogleAd /> */}</div>

          <div
            className="body-post"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
          <div className="page-fb">
            <FacebookProvider appId="991319730968312" language="en_EN">
              <Like
                href="https://www.facebook.com/dagalxy"
                colorScheme="light"
                layout="button_count"
                showFaces
                share
              />
            </FacebookProvider>
          </div>
          <div className="ads1">{/* <InArticleAd /> */}</div>
        </div>

        <h3>Share This Post</h3>

        <Share
          title={post.title}
          url={`https://dagalaxy.com/${router.query.slug}`}
        />

        <RelatedPost related={related} />
        {post.tags.length > 0 && (
          <>
            <h3>Tags: </h3>
            <div className="blog-footer">
              <div className="tags">
                {post.tags.map((t) => (
                  <Link href="/tag/[slug]" as={`/tag/${t}`} key={t}>
                    <a>
                      <div className="badge">{t}</div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* <div dangerouslySetInnerHTML={{ __html: post.html }}></div> */}

      {enableLoadComments && <p onClick={loadComments}>Load Comments</p>}

      <div id="disqus_thread"></div>
    </Layout>
  );
};

export default Post;
