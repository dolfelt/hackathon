import {Record} from 'immutable';
class Comment extends Record({
  id: "",
  message: "",
  user: "",
  timestamp: "",
}) {

}

export default Comment;
