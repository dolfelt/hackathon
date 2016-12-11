import React, {PropTypes} from 'react';
import {
  Card, CardText, CardBlock, CardHeader, Button, Tag
} from 'reactstrap';
import Link from 'react-router/Link';

const IdeaCard = ({
  id,
  title,
  description,
  className,
  user,
  voteCount,
  ...props,
}) => (
  <Card
    className={`idea-card ${className}`}
    style={{height: '100%'}}
  >
    <CardHeader>
      <img className="card-avatar float-xs-left mr-1" src={user.avatar} />
      <h4>{title}</h4>
      <Tag className="float-xs-right">{voteCount} votes</Tag>
      <addr>{user.name}</addr>
    </CardHeader>
    <CardBlock style={{height: 'calc(100% - 4.5rem)'}}>
      <CardText style={{height: 'calc(100% - 3.25rem)'}}>
        {description.substr(0,100)}
      </CardText>
      <Link to={`/idea/${id}`}>{
        ({href, onClick}) => <Button href={href} onClick={onClick}>View Idea</Button>
      }</Link>
    </CardBlock>
  </Card>
);

IdeaCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  user: PropTypes.object,
}

export default IdeaCard;
