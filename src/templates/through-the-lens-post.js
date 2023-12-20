import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import { getSrc } from 'gatsby-plugin-image';

import '../fonts/fonts-post.css';
import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ImageComponent from '../components/ImageComponent';
import Comments from '../components/Comments';
import {
  MobileContainer,
  Column,
  MakeItBigContainer,
} from '../components/layout/Container';
import {
  formatPostDate,
  formatPostLocation,
  formatNumberOfPhotos,
} from '../utils/helpers';
import { rhythm, scale } from '../utils/typography';

import 'katex/dist/katex.min.css';
import './blog-post.css';


class ThroughTheLensPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const siteUrl = get(this.props, 'data.site.siteMetadata.siteUrl');
    let { previous, next, slug } = this.props.pageContext;

    const ogimage = post.frontmatter.featuredImage;
    const ogImagePath = ogimage && getSrc(ogimage);

    const location = get(post, 'frontmatter.location');

    const imageRows = get(post, 'frontmatter.imageRows');

    const category = get(post, 'fields.category');

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.frontmatter.title,
      image: post.frontmatter.imageRows
        .map((imageRow) =>
          imageRow.map((image) => ({
            '@type': 'ImageObject',
            contentUrl: `${siteUrl}${getSrc(image)}`,
            creator: {
              '@type': 'Person',
              name: 'Jedr Blaszyk',
            },
          }))
        )
        .flat(),
      datePublished: post.frontmatter.date,
      url: `${siteUrl}/${category}${post.fields.slug}`,
      author: [
        {
          '@type': 'Person',
          name: 'Jedr Blaszyk',
          url: 'https://j.blaszyk.me/',
        },
      ],
    };

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={`${post.frontmatter.title} - Through the Lens`}
          description={`Through the Lens: ${post.frontmatter.title}`}
          slug={this.props.path}
          image={ogImagePath}
          structuredData={structuredData}
        />
        <main>
          <article className="post">
            <header>
              <h1
                style={{
                  color: 'var(--textTitle)',
                  marginTop: 0,
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
                to={`/${post.fields.category}/`}
                rel="bookmark"
              >
                <p>{'Through The Lens'}</p>
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
                {formatPostLocation(location)}
                <span style={{ margin: '0 0.15rem' }}>{` • `}</span>
                {formatNumberOfPhotos(post.frontmatter)}
              </p>
            </header>
            <MakeItBigContainer>
              {imageRows.map((imgRow) => {
                return (
                  <MobileContainer>
                    {imgRow.map((img) => {
                      const imgExifData = img.childImageSharp.fields.exif;
                      const exifCaption =
                        // `${imgExifData.Make} ${imgExifData.Model}<br/>` +
                        // `${imgExifData.LensMake} ${imgExifData.LensModel}<br/>` +
                        `${imgExifData.FocalLengthRounded}mm | f/${imgExifData.FNumber} | ${imgExifData.ExposureTimeFormatted} | ISO ${imgExifData.ISO}`;
                      return (
                        <Column>
                          <ImageComponent
                            image={img}
                            alt={img.childImageSharp.id}
                            key={img.childImageSharp.id}
                            description={exifCaption}
                          />
                        </Column>
                      );
                    })}
                  </MobileContainer>
                );
              })}
            </MakeItBigContainer>
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
                    to={`/${category}${previous.fields.slug}`}
                    rel="prev"
                    // style={{ marginRight: 20 }}
                  >
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
              to={'/through-the-lens/'}
            >
              Through the Lens
            </Link>
          </h3>
          <Bio />
          <Comments />
        </aside>
      </Layout>
    );
  }
}

export default ThroughTheLensPostTemplate;

export const pageQuery = graphql`
  query ThroughTheLensPostBySlug($slug: String!) {
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
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        location
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 960, layout: FIXED)
          }
        }
        imageRows {
          childImageSharp {
            id
            gatsbyImageData(width: 1800, layout: CONSTRAINED, quality: 90)
            fields {
              exif {
                Make
                Model
                ExposureTimeFormatted
                FNumber
                FocalLength
                FocalLengthRounded
                LensMake
                LensModel
                ISO
              }
            }
          }
        }
      }
      fields {
        slug
        category
      }
    }
  }
`;
