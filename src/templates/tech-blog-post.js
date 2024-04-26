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
import Comments from '../components/Comments';
import {
  Container,
  Column,
  MakeItBigContainer,
  ThreePhotosContainer,
} from '../components/layout/Container';
import { formatPostDate, formatReadingTime } from '../utils/helpers';
import { rhythm, scale } from '../utils/typography';

import {
  StatefulSliderPicker,
  StatefulBlockPicker,
} from '../components/ColorPicker';

import TableOfContents from '../components/TableOfContents';

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
  StatefulSliderPicker,
  StatefulBlockPicker,
};

class TechBlogPostTemplate extends React.Component {
  render() {
    const { children } = this.props;
    const post = this.props.data.mdx;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const siteUrl = get(this.props, 'data.site.siteMetadata.siteUrl');
    let { previous, next } = this.props.pageContext;

    const ogimage = post.frontmatter.ogimage;
    const ogImagePath = ogimage && getSrc(ogimage);

    const category = get(post, 'fields.category');

    const postUrl = `${siteUrl}/${category}${post.fields.slug}`;

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.frontmatter.title,
      datePublished: post.frontmatter.date,
      url: postUrl,
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
        tocComponent={<TableOfContents {...post.tableOfContents} />}
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
                {formatReadingTime(post.fields.timeToRead.minutes)}
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
                  <Link to={`/${category}${previous.fields.slug}`} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={`/${category}${next.fields.slug}`} rel="next">
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
          <Comments
            url={postUrl}
            id={post.fields.slug}
            title={post.frontmatter.title}
          />
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
        siteUrl
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
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
        category
        timeToRead {
          minutes
        }
      }
    }
  }
`;
