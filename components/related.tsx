import React from "react";
import Link from "next/link";
import { PostType } from "../pages";
import { Post } from "../pages/[slug]";

const RelatedPost: React.FC<{ related: [PostType] }> = ({ related }) => (
  <>
    <h3>Related Post</h3>
    <ul className="list-card">
      {related.map((post) => (
        <div key={post.slug} className="card">
          <Link href="/[slug]" as={`/${post.slug}`}>
            <a>
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
              <h2>{post.title}</h2>
            </a>
          </Link>
        </div>
      ))}
    </ul>
  </>
);

export default RelatedPost;
