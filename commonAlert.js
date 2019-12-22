/**
 * Created by kic on 2019. 12. 16..
 * Admin2 custom alrt , confirm
 */

(function (Vue) {
    Vue.component('commonAlert', {
        template: `<modal ref="commonAlert" v-show="isPop" @click="onClose" :title="title" :isTitleBar=true :bodyStyle="bodyStyle" @close="onClose">
                        <div class="modal-content pt-20">
                           {{msg}}
                        </div>
                    </modal>`,
        data() {
            return {
                isPop:false,
                isConfirm:false,
                msg: '',
                title:'',
                bodyStyle:{},
                resolve: null,
                reject: null,
            }
        },
        created(){
            this.$root._dynamicContainer = this;
            //Vue.prototype.$alertContainer = this;
        },
        computed: {
        },
        methods: {
            onClose(){
                this.isPop = false;
                this.resolve(true)
            },
            onClickOk(){
                this.resolve(true)
            },
            alert(isConfirm,msg,width,height){

                let bodyStyle = {};
                if (width !== undefined){
                    bodyStyle.width = width+'px';
                }else{
                    bodyStyle.width = '350px';
                }

                if (height !== undefined){
                    bodyStyle.height = height+'px';
                }
                this.isConfirm = isConfirm;
                this.bodyStyle = bodyStyle;
                this.isPop = true;
                this.msg = msg;

                return new Promise((resolve, reject) => {
                    this.resolve = resolve
                    this.reject = reject
                })

            }
        },
        watch: {
            isPop(value){
                if (value){

                }
            }
        }
    });
})(Vue);