import Head from "next/head";
import Link from "next/link";
import connectDB from "../config/db";
import Layout from "../components/layout";
import { Article } from "../models/Article";
import { Cat } from "../models/Cat";

//const { BLOG_URL, CONTENT_API_KEY } = process.env;

export type PostType = {
  id: string;
  title: string;
  slug: string;
  imgUri: string;
  cat: {
    title: string;
    slug: string;
  };
};

async function getPosts() {
  // curl ""
  await connectDB();
  let articles = await Article.find()
    .limit(2)
    .sort({ createdAt: "desc" })
    .populate("cat");

  //console.log(articles);
  const res = JSON.parse(JSON.stringify(articles));
  //console.log(res);
  return res;
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  return {
    revalidate: 1000,
    props: { posts },
  };
};

const Home: React.FC<{ posts: PostType[] }> = (props) => {
  const { posts } = props;
  return (
    <Layout>
      <Head>
        <title>Hello to my blog</title>
      </Head>

      <div className="wrap">
        <h2 className="heading-h2">
          <span className="heading-span">Blogs</span>
        </h2>
        <div className="card-list">
          {posts.map((edge) => {
            return (
              <div key={edge.slug} className="card">
                <div className="thumb">
                  <Link href="/[slug]" as={`/${edge.slug}`}>
                    <a>
                      <picture>
                        <source
                          media="(min-width: 1200px)"
                          srcSet={`${edge.imgUri}?w=800&fit=fill&fm=webp`}
                          type="image/webp"
                        />
                        <source
                          media="(min-width: 992px)"
                          srcSet={`${edge.imgUri}?w=600&fit=fill&fm=webp`}
                          type="image/webp"
                        />
                        <img
                          src={`${edge.imgUri}?w=400&fit=fill&fm=webp`}
                          alt={edge.title}
                        />
                      </picture>
                    </a>
                  </Link>
                </div>
                <div className="info">
                  <Link href="/[slug]" as={`/${edge.slug}`}>
                    <a>
                      <h4>{edge.title}</h4>
                    </a>
                  </Link>

                  <div className="meta">
                    <Link
                      href="/category/[slug]"
                      as={`/category/${edge.cat.slug}`}
                    >
                      <a>
                        <span>{edge.cat.title}</span>
                      </a>
                    </Link>
                    <span>More...</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
