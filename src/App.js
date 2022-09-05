import React, { useEffect, useState } from 'react';
import './App.scss';
import XMLParser from 'react-xml-parser';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://dev98.de/feed/')
      .then((res) => res.text())
      .then((data) => {
        let feed = new XMLParser().parseFromString(data);
        setItems(feed.getElementsByTagName('item'));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {items.map((item, index) => {
        return (
          <article>
            <a
              href={item.getElementsByTagName('link')[0].value}
              key={item.getElementsByTagName('link')[0].value}
            >
              <h2 key={index}>{item.getElementsByTagName('title')[0].value}</h2>
            </a>
          </article>
        );
      })}
    </>
  );
};

export default App;
