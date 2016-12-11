import {Record} from 'immutable';
import mapValues from 'lodash/mapValues';

class User extends Record({
  id: "",
  avatar: "",
  name: "",
  email: "",
}) {

  static find(users, id) {
    const user = (users||{})[id];
    if (user) {
      return new User({...user, id});
    }
    return new User({id});
  }

  static populateList(list, users, key) {
    const populate = (item, id) => {
      const isKey = key === 'key';
      const lookup = isKey ? id : item[key];

      if (isKey) {
        return this.find(users, lookup);
      }

      item[key] = this.find(users, lookup);
      return item;
    }
    return mapValues(list, (item, id) => {
      if (!item) return item;
      return populate(item, id);
    })
  }
}

export default User;
