import React, { useEffect, useState } from 'react';
import './App.scss';
import XMLParser from 'react-xml-parser';

const App = () => {
  const [items, setItems] = useState([]);

  const ConvertStringToHTML = (str) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.body.innerText;
  };

  const specialSymbolXmlMap = {
    '&#8211;': '-',
    '%20': ' ',
    ' >': '',
  };

  const decodeXml = (string) => {
    return string.replace(/(&#8211;|%20| >)/g, (item) => {
      return specialSymbolXmlMap[item];
    });
  };

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
            <a href={item.getElementsByTagName('link')[0].value} key={index}>
              <h2 key={index}>
                {decodeXml(item.getElementsByTagName('title')[0].value)}
              </h2>
            </a>

            <p>
              {ConvertStringToHTML(
                decodeXml(item.getElementsByTagName('description')[0].value)
              )}
            </p>
          </article>
        );
      })}
    </>
  );
};

export default App;
