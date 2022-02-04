import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/Layout';

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <main>
          <h1>Not Found - 404 :(</h1>
          <p>I haven’t written this post yet.</p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/vmewDMDvemg"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <p>
            Go back to{' '}
            <Link
              style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'var(--textLink)',
              }}
              to={'/'}
            >
              home page
            </Link>
            .
          </p>
        </main>
      </Layout>
    );
  }
}

export default NotFoundPage;
