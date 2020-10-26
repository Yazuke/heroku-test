const axios = require('axios');
const moment = require('moment');

import UserInfoBox from '../userInfoBox/index'

export default {
    name: 'clock-manager',
    components: {UserInfoBox},
    props: [],

    data() {
        return {
            working_id: null,
            clock_in: false,
            messageSnackBar: "",
            showSnackbar: false,
            lastClockIn: "",
            actualDate: "",
            lastClockInVisible: false,
            textClockButton: ""

        }
    },
    computed: {},
    mounted() {
        let date = moment()
        this.actualDate = ' ' + date.date() + ' / ' + (date.month() + 1) + ' / ' + date.year()
        this.getWorkingTimeActuel()
    },
    methods: {

        async clock() {
            if (this.clock_in) {
                this.requestCreatingClock()
                this.updateWorkingTime()
                this.lastClockInVisible = false
                this.textClockButton = "Clock In";
                this.clock_in = false
            } else {
                this.requestCreatingClock()
                await this.createWorkingTime()
                this.getWorkingTimeActuel()
                this.textClockButton = "Clock Out";
                this.clock_in = true
            }
        },
        getWorkingTimeActuel() {
            let userId = this.$route.params.userId;
            axios
                .get('http://localhost:4000/api/workingtimes/' + userId)
                .then(response => {
                    for (let w in response.data.data) {
                        if (response.data.data[w].end == null) {
                            this.textClockButton = "Clock Out";
                            this.lastClockInVisible = true;
                            this.clock_in = true
                            this.working_id = response.data.data[w].id
                            this.lastClockIn = moment(response.data.data[w].start).format('YYYY-MM-DD HH:mm:ss')
                        } else {
                            this.textClockButton = "Clock In";
                        }
                    }
                    if(this.textClockButton === ""){
                        this.textClockButton = "Clock In";
                    }
                })
        },
        requestCreatingClock() {
            axios
                .post('http://localhost:4000/api/clocks/' + this.$route.params.userId, {
                    "clock": {
                        "status": this.clock_in,
                        "time": new Date()
                    }
                }).then(
                response => {
                    if (response.status === 201) {
                        if(this.clock_in)
                        {
                            this.messageSnackBar = "Successfully clock in"
                        } else {
                            this.messageSnackBar = "Successfully clock out"
                        }
                        this.showSnackbar = true;

                    }
                })
        },
        updateWorkingTime() {
            axios.put('http://localhost:4000/api/workingtimes/' + this.working_id, {
                "working_time": {
                    "end": new Date()
                }
            })
        },

        async createWorkingTime() {
            await axios.post('http://localhost:4000/api/workingtimes/' + this.$route.params.userId, {
                "working_time": {
                    "start": new Date(),
                    "end": ""
                }
            })

        }
    }
}


