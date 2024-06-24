import React from 'react';
import { Link, graphql } from 'gatsby';

import get from 'lodash/get';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

class NotFoundPage extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={'Contact'} slug={'/contact'} />
        <main>
          <h1 style={{ marginTop: 0 }}>Contact</h1>
          <p>
            I'm a software engineer working on data ingestion @{' '}
            <a href="https://www.elastic.co/" target="_blank">
              Elastic
            </a>
            . Before, I worked on ranking systems and data ingestion @{' '}
            <a href="https://www.yelp.com/" target="_blank">
              Yelp
            </a>
            . I'm cycling with{' '}
            <a href="https://hazaybikes.com/en/">Hazay Bikes</a>.
          </p>

          <p>
            You can reach me at <a href="mailto:j@blaszyk.me">j@blaszyk.me</a>.
          </p>
          <p>I'm based in Poznań, Poland.</p>
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
