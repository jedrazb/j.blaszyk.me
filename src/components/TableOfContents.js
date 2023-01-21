import React, { useEffect, useState } from 'react';

import './TableOFContents.css';

const getIds = (items) => {
  return items.reduce((acc, item) => {
    if (item.url) {
      // url has a # as first character, remove it to get the raw CSS-id
      acc.push(item.url.slice(1));
    }
    if (item.items) {
      acc.push(...getIds(item.items));
    }
    return acc;
  }, []);
};

const useActiveId = (itemIds) => {
  const [activeId, setActiveId] = useState(``);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
    );
    itemIds.forEach((id) => {
      observer.observe(document.getElementById(id));
    });
    return () => {
      itemIds.forEach((id) => {
        observer.unobserve(document.getElementById(id));
      });
    };
  }, [itemIds]);
  return activeId;
};

const renderItems = (items, activeId) => {
  return (
    <ol>
      {items.map((item) => {
        if (item.url) {
          return (
            <li key={item.url}>
              <a
                href={item.url}
                style={{
                  color: activeId === item.url.slice(1) ? 'tomato' : 'green',
                }}
              >
                {item.title}
              </a>
              {item.items && renderItems(item.items, activeId)}
            </li>
          );
        } else {
          return <li>{item.items && renderItems(item.items, activeId)}</li>;
        }
      })}
    </ol>
  );
};

const TableOfContents = (props) => {
  const idList = getIds(props.items);
  console.log(idList);
  const activeId = useActiveId(idList);
  console.log(activeId);
  console.log(props.items);
  return (
    <details open style={{ position: 'sticky' }}>
      <summary>Table of Contents</summary>
      {renderItems(props.items, activeId)}
    </details>
  );
};

export default TableOfContents;
