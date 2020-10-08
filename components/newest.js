/* import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import blogStyles from "./blog.module.scss"
import SEO from "../components/seo"

const newest = () => {
  const data = useStaticQuery(graphql`
    query {
      allMongodbTestArticles(sort: { fields: id, order: DESC }) {
        edges {
          node {
            title
            slug
            imgUri
            mongodb_id
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className="wrap">
        <h2 className="heading-h2">
          <span className="heading-span">مواضيع</span>
        </h2>
        <div className="card-list">
          {data.allMongodbTestArticles.edges.map(edge => (
            <div key={edge.node.slug} className="card">
              <Link to={`/blog/${edge.node.slug}`}>
                <div className="thumb">
                  <img src={edge.node.thumb.fluid.src} alt="ff" />
                </div>

                <div className="info">
                  <h4>{edge.node.title}></h4>
                  <div className="meta">
                    <span>{edge.node.mongodb_id}</span>
                    <span>المزيد</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <ol className={blogStyles.posts} />
      </div>
    </Layout>
  )
}

export default newest
 */