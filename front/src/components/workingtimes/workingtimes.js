const axios = require('axios');
import moment from 'moment'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

import UserInfoBox from "../userInfoBox/index.vue";

export default {
    name: 'workingTimes',
    components: {
        datetime: Datetime,
        UserInfoBox
    },
    props: [],
    data () {
        return {
            info: null,
            dialogOpen: false,
            dialogTitle: "",
            dialogWorkingTimeInfo: {
                id: -1,
                start: '',
                end: '',
            },
            workingTimeExist: false,
            snackBarMessage: '',
            snackBarOpen: false,
            userId: this.$route.params.userId
        }

    },
    computed: {

    },
    mounted () {
        this.getAllWorkingTimes()
    },
    methods: {
        getAllWorkingTimes() {
            axios.get("http://localhost:4000/api/workingtimes/" + this.userId)
                .then(response => {
                    this.info = response.data.data
                })
                .catch(error => {
                    console.log(error)
                })
        },

        createWorkingTimeRequested() {
            this.dialogWorkingTimeInfo.id = -1
            this.dialogWorkingTimeInfo.start = ""
            this.dialogWorkingTimeInfo.end = ""
            this.dialogTitle = "Create new working time"
            this.dialogOpen = true
            this.workingTimeExist = false
        },

        createWorkingTime() {
            let start = moment(this.dialogWorkingTimeInfo.start).format().toString()
            let end = moment(this.dialogWorkingTimeInfo.end).format().toString()
            axios.post('http://localhost:4000/api/workingtimes/' + this.userId  , {
                "working_time": {
                    "start": start,
                    "end": end
                }
            })
                .then(response => {
                    if (response.status === 201) {
                        this.dialogOpen = false;
                        this.getAllWorkingTimes()
                        this.snackBarMessage = "Successfully create the working time"
                        this.snackBarOpen = true;
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
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
