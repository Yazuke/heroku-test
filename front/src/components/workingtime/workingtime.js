const axios = require('axios');
import moment from 'moment'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

export default {
    name: 'workingTime',
    components: {
        datetime: Datetime,
    },
    props: [],
    data () {
        return {
            info: {},
            userId: this.$route.params.userId,
            workingTimeId: this.$route.params.workingTimeId,
            dialogOpen: false,
            snackBarMessage: "",
            snackBarOpen: false,
        }
    },
    computed: {
    },
    mounted () {
        this.getInfo()
    },
    methods: {
        getInfo() {
            axios.get("http://localhost:4000/api/workingtimes/" + this.userId + "/" + this.workingTimeId)
                .then(response => {
                    this.info = response.data.data[0]
                })
                .catch(error => {
                    console.log(error)
                })
        },

        deleteWorkingTime() {
            axios.delete("http://localhost:4000/api/workingtimes/" + this.workingTimeId)
                .then(response => {
                    if (response.status === 204) {
                        this.$router.push('/workingtimes/' + this.userId)
                    }
                })
        },

        editWorkingTime() {
            let start = moment(this.info.start).format("YYYY-MM-DD HH:mm:ss").toString()
            let end = moment(this.info.end).format("YYYY-MM-DD HH:mm:ss").toString()
            axios.put('http://localhost:4000/api/workingtimes/' + this.workingTimeId, {
                "working_time": {
                    "start": start,
                    "end": end
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        this.dialogOpen = false;
                        this.snackBarMessage = "Successfully edit the working time";
                        this.snackBarOpen = true;
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },

        cancelEdit() {
            this.dialogOpen = false;
            this.getInfo();
        }
    },

    filters: {
        formatMoment: function(value) {
            if (!value)
                return ''
            value = value.toString()
            let time = moment(value)
            return time.format("YYYY-MM-DD HH:mm:ss")
        }
    },
}
