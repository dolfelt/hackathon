import React from 'react';
import {connect} from 'react-redux';
import {firebaseConnect, helpers} from 'react-redux-firebase';
import Link from 'react-router/Link';
import IdeaCard from '../components/IdeaCard';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';

import {Row, Col, Button} from 'reactstrap';
import Loading from '../components/Loading';
import Idea from '../models/Idea';
import User from '../models/User';

const {dataToJS, isLoaded} = helpers;

export const Ideas = ({ideas}) => {
  if (!isLoaded(ideas)) {
    return (<Loading />);
  }
  return (
    <Row>
      <Col xs={12}>
        <div className="box">
          <Link to="/idea/add">{
            ({isActive, location, href, onClick, transition}) =>
              <Button
                href={href}
                onClick={onClick}
                style={{float: 'right'}}
                color="primary"
              >
                <i className="fa fa-plus" /> Add Idea
              </Button>
            }
          </Link>
          <h2>
            Ideas
          </h2>
          <Row>
            {ideas.map((idea) => {
              if (!idea) return null;
              return (
                <Col xs={12} md={6} lg={4} key={idea.id} className="mb-1">
                  <IdeaCard {...idea.toJSON()} />
                </Col>
              )
            })}
          </Row>
        </div>
      </Col>
    </Row>
  )
}

export default connect(
  ({firebase}) => {
    const users = dataToJS(firebase, '/users', {});
    const votes = dataToJS(firebase, '/votes', {});
    const ideas = User.populateList(dataToJS(firebase, '/ideas', {}), users, 'user');
    return {
      ideas: orderBy(map(ideas, idea => {
        if (!idea) return idea;
        const voteCount = votes ? Object.keys(votes[idea.id] || {}).length : 0;
        return new Idea({voteCount, ...idea});
      }), ['voteCount', 'title'], ['desc', 'asc']),
    };
  }
)(
  firebaseConnect([
    '/ideas',
    '/users',
    '/votes',
  ])(Ideas)
);
