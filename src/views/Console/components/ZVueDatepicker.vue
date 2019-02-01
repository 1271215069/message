<template>
    <div class="ZVueDatepicker" v-if="show">
        <date-picker ref="DatePicker" class="date-picker-input" :date="date" :option="optionNew" @change="onChange" @cancel="onCancel"></date-picker>
    </div>
</template>

<script>
    import DatePicker from 'vue-datepicker'
    export default {
        name: "z-vue-datepicker",
        components:{DatePicker},
        props:{
            startTime: {
                type:Object,
                default:()=>{
                    return {}
                }
            },
            option: {
                type:Object,
                default:()=>{
                    return {}
                }
            },
        },
        data () {
            return {
                show:false
            }
        },
        computed:{
            date(){
                return _.merge({
                    time: null
                },this.startTime);
            },
            optionNew(){
                return _.merge({
                    type: 'day',
                    week: ['一', '二', '三', '四', '五', '六', '日'],
                    month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    format: 'YYYY-MM-DD',
                    placeholder: '',
                    color: {
                        header: '#ff6600',
                        headerText: '#000'
                    },
                    buttons: {
                        ok: '确定',
                        cancel: "关闭"
                    },
                },this.option);
            }
        },
        methods:{
            onChange(v){
                this.$emit('onChange',v);
            },
            onCancel(){
                this.$emit('onCancel');
            }
        }
    }
</script>

<style scoped>

</style>