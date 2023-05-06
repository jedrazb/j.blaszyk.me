import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        title
        author
        description
        siteUrl
        social {
          twitter
        }
        image
      }
    }
  }
`;

function SEO({
  meta,
  image,
  title,
  description,
  slug,
  lang = 'en',
  structuredData = null,
}) {
  return (
    <StaticQuery
      query={query}
      render={(data) => {
        const { siteMetadata } = data.site;
        const metaDescription = description || siteMetadata.description;
        const metaImage = `${siteMetadata.siteUrl}${siteMetadata.image}`;
        const url = `${siteMetadata.siteUrl}${slug}`;
        const ogCustomImagePath = `${siteMetadata.siteUrl}${image}`;
        return (
          <Helmet
            htmlAttributes={{ lang }}
            {...(title
              ? {
                  titleTemplate: `%s — ${siteMetadata.title}`,
                  title,
                }
              : {
                  title: `${siteMetadata.title}`,
                })}
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:url',
                content: url,
              },
              {
                property: 'og:title',
                content: title || siteMetadata.title,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:site_name',
                content: siteMetadata.title,
              },
              {
                property: 'robots',
                content: 'index, follow',
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: siteMetadata.social.twitter,
              },
              {
                name: 'twitter:title',
                content: title || siteMetadata.title,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
            ]
              .concat(
                image
                  ? [
                      {
                        property: 'og:image',
                        content: ogCustomImagePath,
                      },
                      {
                        name: 'twitter:image',
                        content: ogCustomImagePath,
                      },
                    ]
                  : []
              )
              .concat(meta)}
          >
            {/* Structured data for rich SEO snippets */}
            {structuredData && (
              <script type="application/ld+json">
                {JSON.stringify(structuredData, null, 2)}
              </script>
            )}
          </Helmet>
        );
      }}
    />
  );
}

SEO.defaultProps = {
  meta: [],
  title: '',
  slug: '',
};

SEO.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  meta: PropTypes.array,
  slug: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default SEO;
