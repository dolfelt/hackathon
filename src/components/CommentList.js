import React, {Component, PropTypes} from 'react';
import {
  Form, InputGroup, InputGroupButton, Input,
  Card, CardBlock, CardHeader, Button,
  ListGroup, ListGroupItem,
} from 'reactstrap';
import Markdown from 'react-markdown';
import map from 'lodash/map';
import format from 'date-fns/format';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

class CommentList extends Component{
  static propTypes = {
    comments: PropTypes.array,
    onComment: PropTypes.func,
  }

  constructor() {
    super();

    this.state = {
      comment: "",
    };
  }

  onComment = (event) => {
    event.preventDefault();
    this.props.onComment(this.state.comment);
    this.setState({comment: ""})
  }

  render() {
    return (
      <Card className="comment-list">
        <CardHeader>Comments</CardHeader>
        <ListGroup flush>
          {map(this.props.comments, (comment, key) => {
            return (
              <ListGroupItem key={key}>
                <h6>
                  <strong>{comment.user.name}</strong> <small>{distanceInWordsToNow(comment.timestamp)} ago</small>
                </h6>
                <Markdown source={comment.message} />
              </ListGroupItem>
            );
          })}
        </ListGroup>
        <CardBlock>
          <Form onSubmit={this.onComment}>
            <InputGroup>
              <Input
                value={this.state.comment}
                onChange={(event) => { this.setState({comment: event.target.value}); }}
              />
              <InputGroupButton>
                <Button color="primary">Send</Button>
              </InputGroupButton>
            </InputGroup>
          </Form>
        </CardBlock>
      </Card>
    );
  }
}

export default CommentList;
