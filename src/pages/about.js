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
                <h3>EigenPal (YC W26)</h3>
                <p className="timeline-location">Founder • San Francisco</p>
                <p className="timeline-date">2025 - Present</p>
                <p className="timeline-description">
                  Building enterprise-grade document understanding platform.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Elastic</h3>
                <p className="timeline-location">
                  Senior Software Engineer • Remote
                </p>
                <p className="timeline-date">2023 - 2025</p>
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
                <h3>Yelp</h3>
                <p className="timeline-location">
                  Senior Software Engineer • London / San Francisco
                </p>
                <p className="timeline-date">2020 - 2023</p>
                <p className="timeline-description">
                  Ranking Platform team. Building search and ranking
                  infrastructure for app search and ads platform.
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
                    <li>Built scalable real time data ingestion pipelines.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Imperial College London</h3>
                <p className="timeline-location">
                  MEng Computing (AI specialization) • London
                </p>
                <p className="timeline-date">2016 - 2020</p>
                <p className="timeline-description">
                  Completed my MEng in Computing with a focus on AI.
                </p>
                <div className="timeline-projects">
                  <ul>
                    <li>
                      <a
                        href="/Master_Thesis.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Master thesis: Geometric Deep Learning for Subcortical
                        Brain Shape Analysis
                      </a>
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
