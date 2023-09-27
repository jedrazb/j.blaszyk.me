import { Link, graphql } from 'gatsby';
import {
  formatPostDate,
  formatReadingTime,
  formatNumberOfPhotos,
} from '../utils/helpers';
import classnames from 'classnames';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import React from 'react';
import SEO from '../components/SEO';
import get from 'lodash/get';
import { rhythm } from '../utils/typography';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import './blog-index.css';

class BlogIndexTemplate extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMdx.edges');

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://j.blaszyk.me/',
      name: 'Jedr Blaszyk',
      alternateName: 'Jedr Blaszyk',
    };

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO structuredData={structuredData} />
        <aside>
          <Bio />
        </aside>
        <main>
          {posts.map(({ node }, idx) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug;
            const indexImage = get(node, 'frontmatter.indexImage');
            return (
              <Link
                style={{
                  boxShadow: 'none',
                  textDecoration: 'none',
                  color: 'var(--textNormal)',
                }}
                to={node.fields.slug}
                rel="bookmark"
              >
                <article
                  key={node.fields.slug}
                  style={{
                    borderBottom: 'solid 1px var(--post-outline)',
                    marginBottom: '1.5rem',
                    paddingBottom: '1.5rem',
                  }}
                  className={classnames('blog-post-tile-layout', {
                    'blog-post-tile-reverse-order': idx % 2 == 1,
                  })}
                >
                  <div className="blog-post-tile-column">
                    {indexImage && (
                      <GatsbyImage
                        image={getImage(indexImage)}
                        alt={'Blog Image'}
                      />
                    )}
                  </div>
                  <div className="blog-post-tile-column">
                    <div className="blog-post-tile-column-description">
                      <header>
                        <h3
                          className={'blog-post-tile-title'}
                          style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: rhythm(4 / 5),
                          }}
                        >
                          {title}
                        </h3>

                        <div
                          style={{
                            paddingTop: rhythm(1 / 5),
                            paddingBottom: 0,
                          }}
                        >
                          <small>
                            {formatPostDate(node.frontmatter.date)}
                            <span style={{ margin: '0 0.15rem' }}>{` • `}</span>
                            {formatReadingTime(node.timeToRead)}
                            <span style={{ margin: '0 0.15rem' }}>{` • `}</span>
                            {formatNumberOfPhotos(node.frontmatter)}
                          </small>
                        </div>
                      </header>
                      <p
                        style={{
                          marginBottom: 0,
                          paddingTop: rhythm(1 / 6),
                          paddingBottom: rhythm(1 / 3),
                        }}
                        dangerouslySetInnerHTML={{
                          __html: node.frontmatter.spoiler,
                        }}
                      />
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </main>
      </Layout>
    );
  }
}

export default BlogIndexTemplate;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { category: { eq: "blog" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            spoiler
            indexImage {
              childImageSharp {
                gatsbyImageData(width: 800, layout: CONSTRAINED)
              }
            }
            images {
              id
            }
            blogImages {
              id
            }
          }
        }
      }
    }
  }
`;
