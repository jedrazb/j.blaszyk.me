module.exports = {
  siteMetadata: {
    title: "Jedr's Blog",
    author: 'Jedr Blaszyk',
    description: 'Blog by Jedr Blaszyk. Bikepacking, photography & tech.',
    siteUrl: 'https://j.blaszyk.me',
    domain: 'j.blaszyk.me',
    social: {
      twitter: '@jedr_blaszyk',
    },
    image: '/logo.png',
  },
  pathPrefix: '/',
  plugins: [
    {
      // blog posts
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      // through the lens posts
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/through-the-lens`,
        name: 'through-the-lens',
      },
    },
    {
      // through the lens posts
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/tech-blog`,
        name: 'tech-blog',
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '÷',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
            },
          },
        ],
      },
    },
    'gatsby-plugin-sitemap',
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          placeholder: `blurred`,
          quality: 80,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
        },
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`G-X3VBX01YFV`],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                const siteUrl = site.siteMetadata.siteUrl;
                const postText = `
                <div style="margin-top=55px; font-style: italic;">(This is an article posted to my blog. You can read it online by <a href="${
                  siteUrl + edge.node.fields.slug
                }">clicking here</a>.)</div>
              `;
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.spoiler,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': postText }],
                });
              });
            },
            query: `
              {
                allMdx(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: {fields: {category: {eq: "blog"}}}
                ) {
                  edges {
                    node {
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        spoiler
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Jedr's Blog",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jedr's Blog`,
        short_name: `personal-blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#f59e47`,
        display: `minimal-ui`,
        icon: `src/assets/logo.png`,
        theme_color_in_head: false,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://j.blaszyk.me/',
        sitemap: 'https://j.blaszyk.me/sitemap/sitemap-index.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `jedr-blog`,
      },
    },
  ],
};
