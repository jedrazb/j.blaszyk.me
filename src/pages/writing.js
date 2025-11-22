import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import get from 'lodash/get';
import { rhythm } from '../utils/typography';

class WritingIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allExternalPost.nodes') || [];

    // Group posts by section
    const sections = {};
    posts.forEach((post) => {
      if (!sections[post.section]) {
        sections[post.section] = [];
      }
      sections[post.section].push(post);
    });

    const sectionKeys = Object.keys(sections);

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Writing" slug="/writing/" />
        <main>
          <header>
            <h1 style={{ marginTop: 0 }}>Writing</h1>
            <p style={{ marginBottom: rhythm(2) }}>
              A collection of posts published on engineering blogs and other
              platforms.
            </p>
          </header>

          {sectionKeys.length === 0 && <p>No external posts configured yet.</p>}

          {sectionKeys.map((sectionName) => (
            <section key={sectionName} style={{ marginBottom: rhythm(2) }}>
              <h2
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  marginTop: rhythm(1),
                  marginBottom: rhythm(1),
                  borderBottom: '1px solid var(--hr)',
                  paddingBottom: rhythm(0.25),
                }}
              >
                {sectionName}
              </h2>
              <ul>
                {sections[sectionName].map((post) => (
                  <li key={post.url} style={{ marginBottom: rhythm(0.25) }}>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.title}
                    </a>
                    <span
                      style={{
                        color: 'var(--textTitle)',
                        marginLeft: '0.5em',
                        fontSize: '0.9em',
                      }}
                    >
                      {post.date}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </main>
      </Layout>
    );
  }
}

export default WritingIndex;

export const pageQuery = graphql`
  query ExternalPostsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allExternalPost(sort: { date: DESC }) {
      nodes {
        title
        url
        date(formatString: "MMMM DD, YYYY")
        section
      }
    }
  }
`;
