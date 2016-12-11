import React, {PropTypes} from 'react';
import {
  Col,
  Row,
  Button,
  Tag,
  Card, CardBlock, CardHeader,
} from 'reactstrap';
import Markdown from 'react-markdown';
import size from 'lodash/size';
import map from 'lodash/map';

const IdeaItem = ({
  idea,
  votes,
  members,
  auth,
  onEdit,
  onVote,
  onJoin,
}) => {
  const voted = !!votes[auth.uid];
  const isMember = !!members[auth.uid];
  return (
    <Row>
      <Col xs={12}>
        <h2>
          {auth.uid === idea.user ?
            <Button onClick={onEdit} className="float-xs-right ml-1">Edit Idea</Button> : null
          }
          <Button className="float-xs-right ml-1" outline={!voted} color="primary" onClick={onVote}>
            <i className={`fa ${voted ? 'fa-thumbs-up' : 'fa-thumbs-o-up'}`} />
          </Button>
          Idea: {idea.title}
        </h2>
        <Row>
          <Col md={8}>
            <Card>
              <CardHeader>
                <Tag className="float-xs-right" style={{marginTop: '0.2rem'}}>
                  {size(votes)} Votes
                </Tag>
                Description
              </CardHeader>
              <CardBlock>
                <Markdown source={idea.description} />
              </CardBlock>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <CardHeader>
                <Button
                  onClick={onJoin}
                  className="float-xs-right ml-1"
                  size="sm"
                  color={isMember ? 'danger' : 'success'}
                  outline
                >
                  {isMember ? 'Leave' : 'Join'}
                </Button>
                Members
              </CardHeader>
              <CardBlock>
                <ul className="member-list">
                  {map(members, (member, id) => {
                    return (
                      <li key={id}>
                        <img className="card-avatar mini" src={member.avatar} /> {member.name}
                      </li>
                    );
                  })}
                </ul>
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

IdeaItem.propTypes = {
  idea: PropTypes.object,
  votes: PropTypes.object,
  members: PropTypes.object,
  auth: PropTypes.object,
  onEdit: PropTypes.func,
  onVote: PropTypes.func,
  onJoin: PropTypes.func,
}

export default IdeaItem;
