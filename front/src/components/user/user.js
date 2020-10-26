const axios = require('axios');


export default {
  name: 'user',
  components: {
  },
  props: [],
  data () {
    return {
      users: {
        data: []
      },
      messageSnackBar: "",
      showSnackbar: false,
      showDialog: false,
      isCreating: false,
      userSelectInfo: {},
      messageTitleDialog: ""
    }
  },
  computed: {

  },
  mounted () {
   this.getAllUsers();
  },
  methods: {
    deleteUser(userID) {
      axios
          .delete('http://localhost:4000/api/users/' + userID).then(
          response => {
            if (response.status === 204) {
              this.getAllUsers()
              this.messageSnackBar = "Successfully delete the user";
              this.showSnackbar = true;
            }
          }
      )
    },
    getAllUsers() {
      axios
          .get('http://localhost:4000/api/users')
          .then(response => (this.users = response.data))
    },
    editUser(userID, email, username){
      this.userSelectInfo = {
        id: userID,
        email: email,
        username: username,
      }
      this.messageTitleDialog = "Update user : " + userID
      this.isCreating = false;
      this.showDialog = true;
    },
    requestEditUser(){
      axios
          .put('http://localhost:4000/api/users/' + this.userSelectInfo.id, {
            "user": {
              "email": this.userSelectInfo.email,
              "username": this.userSelectInfo.username
            }
          }).then(
          response => {
            if (response.status === 200) {
              this.showDialog = false;
              this.getAllUsers()
              this.messageSnackBar = "Successfully edit the user"
              this.showSnackbar = true;
            }
          }
      )
    },
    createUser() {
      this.userSelectInfo = {};
      this.messageTitleDialog = "Create a new user";
      this.isCreating = true;
      this.showDialog = true;
    },
    requestCreatingUser(){
      axios
        .post('http://localhost:4000/api/users/', {
          "user": {
            "email": this.userSelectInfo.email,
            "username": this.userSelectInfo.username
          }
        }).then(
          response => {
            if (response.status === 201) {
              this.showDialog = false;
              this.getAllUsers()
              this.messageSnackBar = "Successfully create the user"
              this.showSnackbar = true;
            }
          })
    }
  }
}


