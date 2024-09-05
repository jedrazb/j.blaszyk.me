import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import { MDXProvider } from '@mdx-js/react';
import { BlockMath, InlineMath } from 'react-katex';
import { getSrc } from 'gatsby-plugin-image';

import '../fonts/fonts-post.css';
import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ImageGallery from '../components/ImageGallery';
import ImageComponent from '../components/ImageComponent';
import LazyIframe from '../components/LazyIframe';
import LazyStravaContainer from '../components/LazyStravaContainer';
import TableOfContents from '../components/TableOfContents';
import Comments from '../components/Comments';
import { BikepackingDetails } from '../components/BikepackingDetails';
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
  LazyStravaContainer,
  BikepackingDetails,
};

class BlogPostTemplate extends React.Component {
  render() {
    const { children } = this.props;
    const post = this.props.data.mdx;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const siteUrl = get(this.props, 'data.site.siteMetadata.siteUrl');
    let { previous, next } = this.props.pageContext;

    const ogimage = post.frontmatter.ogimage;
    const ogImagePath = ogimage && getSrc(ogimage);

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.frontmatter.title,
      image:
        post.frontmatter.images &&
        post.frontmatter.images.map((image) => ({
          '@type': 'ImageObject',
          contentUrl: `${siteUrl}${getSrc(image)}`,
          creator: {
            '@type': 'Person',
            name: 'Jedr Blaszyk',
          },
        })),
      datePublished: post.frontmatter.date,
      url: `${siteUrl}${post.fields.slug}`,
      author: [
        {
          '@type': 'Person',
          name: 'Jedr Blaszyk',
          url: 'https://j.blaszyk.me/',
        },
      ],
    };

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        tocComponent={
          <TableOfContents {...post.tableOfContents} widePostType />
        }
      >
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.spoiler}
          slug={post.fields.slug}
          image={ogImagePath}
          structuredData={structuredData}
        />
        <main>
          <article className="post">
            <header id="post-header">
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
                to={`/`}
                rel="bookmark"
              >
                <p>{'Blog'}</p>
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
                {formatReadingTime(post.fields.timeToRead.minutes)}
                <span style={{ margin: '0 0.15rem' }}>{` • `}</span>
                {formatNumberOfPhotos(post.frontmatter)}
              </p>
            </header>
            <MDXProvider components={shortcodes}>{children}</MDXProvider>
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
              }}
              to={'/'}
            >
              Jedr's Blog
            </Link>
          </h3>
          <aside
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-header)',
              borderRadius: '1em',
              padding: '1.2em 0.6em',
              marginBottom: '1.5rem',
            }}
          >
            <Bio isBike style={{ marginBottom: 0 }} size="l" />
          </aside>
          <Comments
            url={`${siteUrl}${post.fields.slug}`}
            id={post.fields.slug}
            title={post.frontmatter.title}
          />
        </aside>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      tableOfContents
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        spoiler
        ogimage {
          childImageSharp {
            gatsbyImageData(width: 960, layout: FIXED)
          }
        }
        logo {
          childImageSharp {
            gatsbyImageData(width: 960, layout: CONSTRAINED)
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
        timeToRead {
          minutes
        }
      }
    }
  }
`;
