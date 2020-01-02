/**
 * Created by kic on 2019. 12. 16..
 * Admin2 custom alrt , confirm
 */

(Vue=> {
    Vue.component('commonAlert', {
        template: `<modal ref="commonAlert" v-show="isPop" @click="onClose" :title="title" :isTitleBar=false :bodyStyle="bodyStyle" @close="onClose" >
                        <p class="bold pt-30 pb-20 ta-c">{{title}}</p>
                        <div class="container100 ta-c fs-13" v-html="util.replaceNewLine(msg)">
<!--                            {{ msg }}-->
                        </div>                    
                        <div class="container100 pt-40 pb-30 ta-c cf">
                            <button v-show="isConfirm" class="admin-bt wd-90 mr-05" @click="onClickCancel">취소</button>                            
                            <button class="admin-bd-bt wd-80" @click="onClickOk">확인</button>
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
            this.$root[this.$options.name] = this;
        },
        computed: {
        },
        methods: {
            onClose(){

            },
            onClickCancel(){
                this.isPop = false;
                //this.reject();
            },
            onClickOk(){
                this.resolve(true);
                this.isPop = false;
            },
            alert(isConfirm,title,msg,width,height){

                let bodyStyle = {};
                if (width !== undefined){
                    bodyStyle.width = width+'px';
                }else{
                    bodyStyle.width = '400px';
                }

                if (height !== undefined){
                    bodyStyle.height = height+'px';
                }
                this.isConfirm = isConfirm;
                this.title = title;
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
