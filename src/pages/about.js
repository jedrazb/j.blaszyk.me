import React from 'react';
import { Link, graphql } from 'gatsby';

import get from 'lodash/get';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import './about.css';

class NotFoundPage extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={'About'}
          slug={'/'}
          meta={[
            {
              property: 'og:type',
              content: 'profile',
            },
            {
              property: 'og:profile:first_name',
              content: 'Jedr',
            },
            {
              property: 'og:profile:last_name',
              content: 'Blaszyk',
            },
          ]}
        />
        <main>
          <div className="intro-section">
            <p className="intro-text">I ship code, fast.</p>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Senior Software Engineer</h3>
                <p className="timeline-location">
                  <a
                    href="https://www.elastic.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Elastic
                  </a>{' '}
                  • Poland, Remote
                </p>
                <p className="timeline-date">2023 - Present</p>
                <p className="timeline-description">
                  Agent Builder team. Building framework for creating AI agents.
                </p>
                <div className="timeline-projects">
                  <ul>
                    <li>
                      <a
                        href="https://www.elastic.co/elasticsearch/agent-builder"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Elastic Agent Builder
                      </a>{' '}
                      - core engineering team that took it from 0 to 1
                    </li>
                    <li>
                      <a
                        href="https://github.com/elastic/mcp-server-elasticsearch"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Elasticsearch MCP Server
                      </a>{' '}
                      - shipped MCP server for Elasticsearch before it was cool
                    </li>
                    <li>
                      <a
                        href="https://www.elastic.co/docs/reference/search-connectors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Content connectors
                      </a>{' '}
                      - open-source framework for ingesting 3rd party content
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Senior Software Engineer</h3>
                <p className="timeline-location">
                  <a
                    href="https://www.yelp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Yelp
                  </a>{' '}
                  • London / San Francisco
                </p>
                <p className="timeline-date">2020 - 2023</p>
                <p className="timeline-description">
                  Ranking Platform team. Maintaining search and ranking
                  infrastructure for internal search and ads platform.
                </p>
                <div className="timeline-projects">
                  <ul>
                    <li>
                      <a
                        href="https://github.com/Yelp/nrtsearch"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        nrtsearch
                      </a>{' '}
                      - contributor to open-source, highly scalable search
                      engine
                    </li>
                    <li>
                      Worked on scalable real time data ingestion pipeline.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-section">
            <p>
              You can reach me at <a href="mailto:j@blaszyk.me">j@blaszyk.me</a>
            </p>

            <p>
              I'm maintaining{' '}
              <a
                href="https://querybox.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                QueryBox
              </a>{' '}
              - a platform for website AI search and chat.
            </p>

            <p className="side-projects">
              Also follow{' '}
              <a
                href="https://www.cyclingdoppio.cc/en"
                target="_blank"
                rel="noopener noreferrer"
              >
                cyclingdoppio.cc
              </a>{' '}
              for bikepacking and travel adventures.
            </p>
          </div>
        </main>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;

export default NotFoundPage;
