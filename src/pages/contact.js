import React from 'react';
import { Link, graphql } from 'gatsby';

import get from 'lodash/get';

import Layout from '../components/Layout';

class NotFoundPage extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <main>
          <h1>Contact</h1>
          <p>
            You can reach me at <a href="mailto:j@blaszyk.me">j@blaszyk.me</a>{' '}
          </p>
          <p>Have a great day! :)</p>
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
