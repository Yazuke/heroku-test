import ChartLine from "@/components/chart/ChartLine";
import ChartBar from "@/components/chart/ChartBar";
import ChartDonut from "@/components/chart/ChartDonut";

const axios = require('axios');
import UserInfoBox from "../userInfoBox/index.vue";

export default {
    donutData: [],
    userId: null,
    name: 'chartManager',
    components: {ChartLine, ChartBar, ChartDonut, UserInfoBox},
    props: [],
    data() {
        return {
            email: '',
            username: '',
            line: true,
            bar: true,
            donut: true,
            barData: [],
            donutData: [],
            userId: null,
            line_option: "month"
        }
    },
    computed: {},
    mounted() {
        this.userId = this.$route.params.userId;
        axios
            .get(`http://localhost:4000/api/users/${this.userId}`)
            .then(response => {
                this.email = response.data.data.email
                this.username = response.data.data.username
            })
        }
}
