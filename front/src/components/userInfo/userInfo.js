const axios = require('axios');

import UserInfoBox from "../userInfoBox/index.vue";

export default {
    name: 'user-info',
    components: {
        UserInfoBox
    },
    props: [],
    data() {
        return {
            currentUser: {}
        }
    },
    computed: {},
    mounted() {
        this.getUserInfo()
    },
    methods: {
        getUserInfo() {
            axios
                .get('http://localhost:4000/api/users/' + this.$route.params.userId)
                .then(response => {
                    this.currentUser = response.data.data
                })
        }
    }
}


