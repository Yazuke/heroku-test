const axios = require('axios');

export default {
    name: 'UserInfoBox',
    components: {},
    props: [],
    data() {
        return {
            currentUser: {}
        }
    },
    computed: {},
    mounted() {
        axios
            .get('http://localhost:4000/api/users/' + this.$route.params.userId)
            .then(response => {
                this.currentUser = response.data.data
            })
    },
    methods: {}
}


