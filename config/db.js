'use strict;'
//Include crypto to generate the movie id
const crypto = require('crypto');

module.exports = function() {
  return {
    userList: [],

    save(user) {
      user.id = crypto.randomBytes(20).toString('hex');
      this.userList.push(user);
      console.log(user)
      return 1;
    },
    find(id) {
      if (id) {
        return this.userList.find(element => {
            return element.id === id;
        });
      } else {
        return this.userList;
      }
    },
    remove(id) {
      let found = 0;
      this.userList = this.userList.filter(element => {
        if(element.id === id) {
          found = 1;
        } else {
          return element.id !== id;
        }
      });
      return found;
    },
    update(id, user) {
      const userIndex = this.userList.findIndex(element => {
        return element.id === id;
      });
      if (userIndex !== -1) {
        this.userList[userIndex].first_name = user.first_name;
        this.userList[userIndex].last_name = user.last_name;
        this.userList[userIndex].email = user.email;
        return 1;
      } else {
        return 0;
      }
    }
  }
};