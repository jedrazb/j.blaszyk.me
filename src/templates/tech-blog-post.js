import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { BlockMath, InlineMath } from 'react-katex';
import { getSrc } from 'gatsby-plugin-image';

import '../fonts/fonts-post.css';
import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Panel from '../components/Panel';
import ImageGallery from '../components/ImageGallery';
import ImageComponent from '../components/ImageComponent';
import LazyIframe from '../components/LazyIframe';
import {
  Container,
  Column,
  MakeItBigContainer,
  ThreePhotosContainer,
} from '../components/layout/Container';
import {
  formatPostDate,
  formatReadingTime,
  formatNumberOfPhotos,
} from '../utils/helpers';
import { rhythm, scale } from '../utils/typography';

import 'katex/dist/katex.min.css';
import './blog-post.css';

const GITHUB_USERNAME = 'jedrazb';
const GITHUB_REPO_NAME = 'personal-blog';
const systemFont = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif`;

const shortcodes = {
  Link,
  ImageGallery,
  BlockMath,
  InlineMath,
  ImageComponent,
  Container,
  Column,
  MakeItBigContainer,
  ThreePhotosContainer,
  LazyIframe,
};

class TechBlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    let { previous, next, slug } = this.props.pageContext;

    const ogimage = post.frontmatter.ogimage;
    const ogImagePath = ogimage && getSrc(ogimage);

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.spoiler}
          slug={post.fields.slug}
          image={ogImagePath}
        />
        <main>
          <article className="post">
            <header>
              <h1
                style={{
                  color: 'var(--textTitle)',
                  marginTop: '1.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                {post.frontmatter.title}
              </h1>
              <Link
                style={{
                  boxShadow: 'none',
                  textDecoration: 'none',
                  color: 'var(--textLink)',
                  fontFamily: 'Montserrat, sans-serif',
                }}
                to={`/tech-blog/`}
                rel="bookmark"
              >
                <p>{'Tech Blog'}</p>
              </Link>
              <p
                style={{
                  ...scale(-1 / 5),
                  display: 'block',
                  marginBottom: rhythm(1),
                  marginTop: rhythm(-4 / 5),
                }}
              >
                {formatPostDate(post.frontmatter.date)}
                <span style={{ margin: '0 0.15rem' }}>{` • `}</span>
                {formatReadingTime(post.timeToRead)}
              </p>
            </header>
            <MDXProvider components={shortcodes}>
              <MDXRenderer frontmatter={post.frontmatter}>
                {post.body}
              </MDXRenderer>
            </MDXProvider>
          </article>
        </main>
        <aside>
          <nav>
            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                listStyle: 'none',
                padding: 0,
                marginLeft: 0,
              }}
            >
              <li>
                {previous && (
                  <Link
                    to={previous.fields.slug}
                    rel="prev"
                    // style={{ marginRight: 20 }}
                  >
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
          <h3
            style={{
              fontFamily: 'Montserrat, sans-serif',
              marginTop: rhythm(0.25),
            }}
          >
            <Link
              style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'var(--textLink)',
                fontSize: rhythm(4 / 5),
              }}
              to={'/'}
            >
              Jedr's Blog
            </Link>
            {' • '}
            <Link
              style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'var(--textLink)',
                fontSize: rhythm(4 / 5),
              }}
              to={'/tech-blog/'}
            >
              Tech Blog
            </Link>
          </h3>
          <Bio />
        </aside>
      </Layout>
    );
  }
}

export default TechBlogPostTemplate;

export const pageQuery = graphql`
  query TechBlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        spoiler
        cta
        ogimage {
          childImageSharp {
            gatsbyImageData(width: 960, layout: FIXED)
          }
        }
        images {
          childImageSharp {
            gatsbyImageData(width: 1400, layout: CONSTRAINED, quality: 90)
          }
        }
        blogImages {
          childImageSharp {
            gatsbyImageData(width: 1400, layout: CONSTRAINED, quality: 90)
          }
        }
      }
      fields {
        slug
      }
    }
  }
`;
