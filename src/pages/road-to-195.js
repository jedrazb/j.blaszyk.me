import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';

import countriesJSON from '../assets/world-countries.json';

import get from 'lodash/get';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { MakeItBigContainer } from '../components/layout/Container';
import { set } from 'lodash';

const visitedList = [
  'POL',
  'DEU',
  'AUT',
  'CZE',
  'SVK',
  'SVN',
  'GBR',
  'USA',
  'ESP',
  'ITA',
  'FRA',
  'CHE',
  'HRV',
  'SRB',
  'BIH',
  'MNE',
  'NOR',
  'SWE',
  'ISL',
  'DNK',
  'GRC',
  'MYS',
  'PHL',
  'KHM',
  'MMR',
  'IDN',
  'THA',
  'SGP',
  'VAT',
  'LAO',
  'TUR',
  'HUN',
];

const RoadTo195Page = (props) => {
  const [content, setContent] = useState('');

  const siteTitle = get(props, 'data.site.siteMetadata.title');

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title={'Road to 195'} slug={'/road-to-195'} />
      <main>
        <h1 style={{ marginTop: 0, marginBottom: '1rem' }}>Road to 195</h1>

        <p>
          Visiting all 195 countries in the world is an exciting goal. It will
          require careful planning and a lot of hard work, but the reward of
          experiencing so many different cultures and places is well worth it.
          Over the course of this blog, I will be documenting my progress as I
          travel to each country and share with you my experiences, insights,
          and lessons learned along the way.
        </p>

        <p>
          Progress:{' '}
          <strong style={{ color: 'var(--textLink)' }}>
            {visitedList.length} / 195
          </strong>
        </p>

        <MakeItBigContainer>
          <div
            style={{
              display: 'block',
              maxWidth: '1120px',
              height: '100%',
              width: '100%',
              padding: '0 1rem',
            }}
          >
            <ComposableMap
              projectionConfig={{
                rotate: [-10, 0, 0],
                scale: 147,
              }}
              height={450}
            >
              <Sphere stroke="var(--textTitle)" strokeWidth={0.5} />
              <Graticule stroke="var(--textTitle)" strokeWidth={0.5} />

              <Geographies geography={countriesJSON}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const isVisited = visitedList.find((s) => s === geo.id);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={
                          isVisited
                            ? 'var(--map-visited)'
                            : 'var(--map-notvisited'
                        }
                        onMouseEnter={() => {
                          setContent(`${geo.properties.name}`);
                        }}
                        onMouseLeave={() => {
                          setContent('');
                        }}
                        style={{
                          default: { outline: 'none' },
                          hover: { outline: 'none' },
                          pressed: { outline: 'none' },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
            {/* <Tooltip>{content}</Tooltip> */}
          </div>
        </MakeItBigContainer>
      </main>
    </Layout>
  );
};

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

export default RoadTo195Page;
