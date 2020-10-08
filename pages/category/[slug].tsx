import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { Cat } from "../../models/Cat";
import { PostType } from "../index";
//const { BLOG_URL, CONTENT_API_KEY } = process.env

async function getPost(slug: string) {
  const cat = await Cat.findOne({ slug: slug }).populate("articles");
  /* const res = await fetch(
		`${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html`
	).then((res) => res.json()) */
  console.log(cat.title);

  const res = JSON.parse(JSON.stringify(cat));

  return res;
}

// Ghost CMS Request
export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  return {
    props: { post },
    revalidate: 1000,
  };
};

// hello-world - on first request = Ghost CMS call is made (1)
// hello-world - on other requests ... = filesystem is called (1M)

export const getStaticPaths = () => {
  // paths -> slugs which are allowed
  // fallback ->
  return {
    paths: [],
    fallback: true,
  };
};

export type category = {
  title: string;
  articles: [PostType];
  slug: string;
};

const Category: React.FC<{ post: category }> = (props) => {
  //console.log(props);

  const { post } = props;
  const [enableLoadComments, setEnableLoadComments] = useState<boolean>(true);

  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout>
      <div className="wrap">
        <h2 className="heading-h2">
          <span className="heading-span">{post.title}</span>
        </h2>
        <div className="card-list">
          {post.articles.map((article) => {
            console.log(article.title);

            return (
              <div key={article.slug} className="card">
                <div className="thumb">
                  <Link href="/[slug]" as={`/${article.slug}`}>
                    <a>
                      <picture>
                        <source
                          media="(min-width: 1200px)"
                          srcSet={`${article.imgUri}?w=800&fit=fill&fm=webp`}
                          type="image/webp"
                        />
                        <source
                          media="(min-width: 992px)"
                          srcSet={`${article.imgUri}?w=600&fit=fill&fm=webp`}
                          type="image/webp"
                        />
                        <img
                          src={`${article.imgUri}?w=400&fit=fill&fm=webp`}
                          alt={article.title}
                        />
                      </picture>
                    </a>
                  </Link>
                </div>
                <div className="info">
                  <Link href="/[slug]" as={`/${article.slug}`}>
                    <a>
                      <h4>{article.title || ""}</h4>
                    </a>
                  </Link>

                  <div className="meta">
                    <Link
                      href="/category/[slug]"
                      as={`/category/${article.cat.title}`}
                    >
                      <a>
                        <span>{article.cat.title}</span>
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

export default Category;
