import {Record} from 'immutable';
class Idea extends Record({
  id: "",
  title: "",
  repo: "",
  description: "",
  user: {},
  voteCount: 0,
  maxMembers: 0,
}) {

}

export default Idea;
