import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {firebaseConnect, helpers} from 'react-redux-firebase';
import Redirect from 'react-router/Redirect';
import mapValues from 'lodash/mapValues';
import Firebase from 'firebase';
import sortBy from 'lodash/sortBy';

import Idea from '../models/Idea';
import User from '../models/User';
import IdeaEdit from '../components/IdeaEdit';
import IdeaItem from '../components/IdeaItem';
import CommentList from '../components/CommentList';
import {uuid} from '../utils';

const {dataToJS, pathToJS, isLoaded, isEmpty} = helpers;

class IdeaView extends Component {
  static propTypes = {
    idea: PropTypes.object,
    votes: PropTypes.object,
    members: PropTypes.object,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props) {
    super(props);

    const isNew = props.params.id === 'add';
    this.state = {
      isNew,
      editing: isNew,
      idea: new Idea(props.idea || {}),
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.idea && newProps.idea !== this.props.idea) {
      this.setState({idea: new Idea(newProps.idea)});
    }
  }

  onEdit = () => {
    this.setState({editing: true});
  }

  onView = () => {
    this.setState({
      editing: false,
      idea: new Idea(this.props.idea),
    });
  }

  onChange = key => event => {
    this.setState({
      idea: this.state.idea.set(key, event.target.value)
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.saving) {
      return;
    }

    this.setState({saving: true});
    let idea = this.state.idea;
    if (!idea.id) {
      idea = idea.set('id', uuid())
        .set('user', this.props.auth.uid);
    }
    this.props.firebase.set(`/ideas/${idea.id}`, idea.toJSON(), (err) => {
      this.setState({saving: false, editing: false});
    })
  }

  onVote = () => {
    let {idea, auth, votes} = this.props;
    const path = `/votes/${idea.id}/${auth.uid}`;
    if (!votes || !votes[auth.uid]) {
      this.props.firebase.set(path, auth.displayName);
    } else {
      this.props.firebase.remove(path);
    }
  }

  onJoin = () => {
    let {idea, auth, members} = this.props;
    const path = `/members/${idea.id}/${auth.uid}`;
    if (!members || !members[auth.uid]) {
      this.props.firebase.set(path, auth.displayName);
    } else {
      this.props.firebase.remove(path);
    }
  }

  onComment = (comment) => {
    this.props.firebase.set(`/comments/${this.props.idea.id}/${uuid()}`, {
      message: comment,
      user: this.props.auth.uid,
      timestamp: Firebase.database.ServerValue.TIMESTAMP,
    })
  }

  onDelete = () => {
    const ideaId = this.props.idea.id;
    Promise.all([
      this.props.firebase.remove(`/comments/${ideaId}`),
      this.props.firebase.remove(`/members/${ideaId}`),
      this.props.firebase.remove(`/votes/${ideaId}`),
    ]).then(() => {
      this.props.firebase.remove(`/ideas/${ideaId}`);
      this.context.router.replaceWith('/');
    })
  }

  renderEdit() {
    return (
      <IdeaEdit
        idea={this.state.idea}
        saving={this.state.saving}
        onCancel={this.onView}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        onDelete={this.onDelete}
      />
    );
  }

  renderIdea() {
    const {idea, auth, votes, members, comments} = this.props;
    if (!isLoaded(idea, votes, members)) {
      return (<div>Loading...</div>);
    }
    if (isEmpty(idea)) {
      return (<Redirect to="/" />);
    }

    return (
      <div>
        <IdeaItem
          auth={auth}
          idea={idea}
          votes={votes || {}}
          members={members || {}}
          onEdit={this.onEdit}
          onVote={this.onVote}
          onJoin={this.onJoin}
        />
        <CommentList
          comments={comments}
          onComment={this.onComment}
        />
      </div>
    );
  }

  render() {
    if (this.state.editing) {
      return this.renderEdit();
    }

    return this.renderIdea();
  }
}

export default connect(
  ({firebase}, {params}) => {
    const memberList = dataToJS(firebase, `/members/${params.id}`);
    const commentList = dataToJS(firebase, `/comments/${params.id}`);
    const users = dataToJS(firebase, `/users`);
    const members = users && memberList ? User.populateOn(memberList, users, 'key') : {};
    const comments = users && commentList ? User.populateOn(commentList, users, 'user') : {};

    return {
      auth: pathToJS(firebase, 'auth'),
      idea: dataToJS(firebase, `/ideas/${params.id}`),
      votes: dataToJS(firebase, `/votes/${params.id}`),
      comments: sortBy(comments, ['timestamp']),
      members,
    };
  }
)(
  firebaseConnect(({params}, firebase) => {
    return [
      `/ideas/${params.id}`,
      `/votes/${params.id}`,
      `/members/${params.id}`,
      `/comments/${params.id}`,
      '/users',
    ];
  })(IdeaView)
);
