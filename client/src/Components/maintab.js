import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import CardItem from "./cardItem"

function BrowseTab() {
  return (
    <Col>
      <CardItem type='getAll' />
    </Col>
  );
}

function MyReviews() {
  return (
    <Col>
      <CardItem type='getUserMovies' />
    </Col>
  );
}


function MainTab() {
  const [key, setKey] = useState('tab1');

  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k)} bg = "light" fill>

      <Tab eventKey="tab1" title="Browse Movies" key="tab1">
        <BrowseTab key={key} />
      </Tab>

      <Tab eventKey="tab2" title="My Reviews" key="tab2">
        <MyReviews key={key} />
      </Tab>

    </Tabs>
  );
}

export default MainTab;
