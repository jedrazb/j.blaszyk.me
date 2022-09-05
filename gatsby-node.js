const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js');

    createPage({
      path: '/',
      component: path.resolve('./src/templates/blog-index.js'),
    });

    // blog posts
    resolve(
      graphql(
        `
          {
            allMdx(
              sort: { fields: [frontmatter___date], order: DESC }
              filter: { fields: { category: { eq: "blog" } } }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                    directoryName
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
          return;
        }

        // Create blog posts pages.
        const posts = result.data.allMdx.edges;
        const allSlugs = _.reduce(
          posts,
          (result, post) => {
            result.add(post.node.fields.slug);
            return result;
          },
          new Set()
        );

        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          });
        });
      })
    );

    createPage({
      path: '/through-the-lens',
      component: path.resolve('./src/templates/through-the-lens-index.js'),
    });

    // through the lens posts
    resolve(
      graphql(
        `
          {
            allMdx(
              sort: { fields: [frontmatter___date], order: DESC }
              filter: { fields: { category: { eq: "through-the-lens" } } }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                    directoryName
                    category
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
          return;
        }

        // Create through the lens posts pages.
        const posts = result.data.allMdx.edges;
        const allSlugs = _.reduce(
          posts,
          (result, post) => {
            result.add(post.node.fields.slug);
            return result;
          },
          new Set()
        );

        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          const nodePath = `${post.node.fields.category}${post.node.fields.slug}`;

          createPage({
            path: nodePath,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          });
        });
      })
    );
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (_.get(node, 'internal.type') === `Mdx`) {
    createNodeField({
      node,
      name: 'directoryName',
      value: path.basename(path.dirname(_.get(node, 'fileAbsolutePath'))),
    });
    createNodeField({
      node,
      name: `slug`,
      value: createFilePath({ node, getNode, basePath: `blog` }),
    });
    createNodeField({
      node,
      name: `category`,
      value: path.basename(
        path.dirname(path.dirname(_.get(node, 'fileAbsolutePath')))
      ),
    });
  }
};
