import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Article } from "../../models/Article";
import Layout from "../../components/layout";
import { PostType } from "../index";
//const { BLOG_URL, CONTENT_API_KEY } = process.env

async function getPost(slug: string) {
  const articles = await Article.find({ tags: slug });

  const res = JSON.parse(JSON.stringify(articles));

  return res;
}

// Ghost CMS Request
export const getStaticProps = async ({ params }) => {
  const posts = await getPost(params.slug);
  return {
    props: { posts },
    revalidate: 1000,
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

const Tag: React.FC<{ posts: [PostType] }> = (props) => {
  //console.log(props);

  const { posts } = props;
  const [enableLoadComments, setEnableLoadComments] = useState<boolean>(true);

  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout>
      <Head>
        <title>Hello to my blog</title>
      </Head>

      <div className="wrap">
        <h2 className="heading-h2">
          <span className="heading-span">{router.query.slug}</span>
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

export default Tag;
