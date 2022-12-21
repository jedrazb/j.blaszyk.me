import { Link, graphql } from 'gatsby';
import {
  formatPostDate,
  formatReadingTime,
  formatNumberOfPhotos,
  formatPostLocation,
} from '../utils/helpers';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import React from 'react';
import SEO from '../components/SEO';
import get from 'lodash/get';
import { rhythm } from '../utils/typography';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import './through-the-lens-index.css';

class ThroughTheLensIndexTemplate extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMdx.edges');

    const title = 'Through the Lens';

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={title} location={this.props.location} />
        <aside>
          <h1 style={{ marginTop: 0 }}>Through the Lens</h1>
        </aside>
        <main className="posts-layout-wrapper">
          {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug;
            const featuredImage = get(node, 'frontmatter.featuredImage');
            const location = get(node, 'frontmatter.location');
            const postLink = `/${node.fields.category}${node.fields.slug}`;
            return (
              <Link
                style={{
                  boxShadow: 'none',
                  textDecoration: 'none',
                  color: 'var(--textNormal)',
                }}
                to={`/${node.fields.category}${node.fields.slug}`}
                rel="bookmark"
              >
                <article
                  key={node.fields.slug}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '20px',
                    border: 'solid 1px var(--post-outline)',
                    marginBottom: '1.5rem',
                    overflow: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                >
                  <header>
                    <h3
                      style={{
                        color: 'var(--textLink)',
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: rhythm(5 / 8),
                        margin: rhythm(1 / 3),
                      }}
                    >
                      {title}
                    </h3>
                    <div
                      style={{
                        margin: rhythm(1 / 3),
                        marginBottom: rhythm(1 / 4),
                        marginTop: 0,
                      }}
                    >
                      <small>
                        {formatPostDate(node.frontmatter.date)}
                        <span style={{ margin: '0 0.15rem' }}>{` • `}</span>
                        {formatPostLocation(location)}
                        <span style={{ margin: '0 0.15rem' }}>{` • `}</span>
                        {formatNumberOfPhotos(node.frontmatter)}
                      </small>
                    </div>
                  </header>

                  {featuredImage && (
                    <GatsbyImage
                      image={getImage(featuredImage)}
                      alt={'Blog Image'}
                    />
                  )}
                </article>
              </Link>
            );
          })}
        </main>
      </Layout>
    );
  }
}

export default ThroughTheLensIndexTemplate;

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
      filter: { fields: { category: { eq: "through-the-lens" } } }
    ) {
      edges {
        node {
          fields {
            slug
            category
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            location
            featuredImage {
              childImageSharp {
                gatsbyImageData(width: 1000, layout: CONSTRAINED)
              }
            }
            imageRows {
              id
            }
          }
        }
      }
    }
  }
`;
