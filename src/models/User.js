import {Record} from 'immutable';
import mapValues from 'lodash/mapValues';

class User extends Record({
  id: "",
  avatar: "",
  name: "",
  email: "",
}) {

  static populateOn(list, users, id) {
    return mapValues(list, (item, key) => {
      if (!item) return item;
      const isKey = id === 'key'
      const user = users[isKey ? key : item[id]];

      if (isKey) {
        if (user) {
          return new User(user);
        } else {
          return new User({name: item});
        }
      }

      if (user) {
        item[id] = user;
      } else {
        item[id] = {}
      }
      return item;
    })
  }
}

export default User;
