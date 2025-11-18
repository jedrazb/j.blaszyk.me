const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
var exifr = require('exifr');
const readingTime = require('reading-time');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const techBlogPost = path.resolve('src/templates/tech-blog-post.js');

    createPage({
      path: '/',
      component: path.resolve('src/pages/about.js'),
    });

    createPage({
      path: '/tech-blog/',
      component: path.resolve('src/templates/tech-blog-index.js'),
    });

    // tech-blog posts
    resolve(
      graphql(`
        {
          allMdx(
            sort: { frontmatter: { date: DESC } }
            filter: { fields: { category: { eq: "tech-blog" } } }
            limit: 1000
          ) {
            edges {
              node {
                fields {
                  slug
                  category
                }
                frontmatter {
                  title
                }
                internal {
                  contentFilePath
                }
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
          return;
        }

        // Create blog posts pages.
        const posts = result.data.allMdx.edges;
        _.reduce(
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
            component: `${techBlogPost}?__contentFilePath=${post.node.internal.contentFilePath}`,
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
      name: `timeToRead`,
      value: readingTime(node.body),
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
        path.dirname(path.dirname(_.get(node, 'internal.contentFilePath')))
      ),
    });
  }
  if (node.internal.type === 'ImageSharp') {
    const parent = getNode(node.parent);
    exifr
      .parse(parent.absolutePath, [
        'Make',
        'Model',
        'ExposureTime',
        'FNumber',
        'FocalLength',
        'ISO',
        'LensMake',
        'LensModel',
      ])
      .then((exifData) => {
        createNodeField({
          node,
          name: 'exif',
          value: exifData && {
            ...exifData,
            ExposureTimeFormatted: formatExposureTime(exifData.ExposureTime),
            FocalLengthRounded: roundFocalLength(exifData.FocalLength),
          },
        });
      });
  }
};

const roundFocalLength = (l) => {
  return Math.round(l);
};

const formatExposureTime = (d) => {
  if (d >= 1) {
    return Math.round(d * 10) / 10 + 's'; // round to one decimal if value > 1s by multiplying it by 10, rounding, then dividing by 10 again
  }
  var df = 1,
    top = 1,
    bot = 1;
  var tol = 1e-8;
  // iterate while value not reached and difference (positive or negative, hence the Math.abs) between value
  // and approximated value greater than given tolerance
  while (df !== d && Math.abs(df - d) > tol) {
    if (df < d) {
      top += 1;
    } else {
      bot += 1;
      top = parseInt(d * bot, 10);
    }
    df = top / bot;
  }
  if (top > 1) {
    bot = Math.round(bot / top);
    top = 1;
  }
  if (bot <= 1) {
    return '1s';
  }
  return top + '/' + bot + 's';
};
