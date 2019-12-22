/**
 * Created by kic(ddori) on 2019. 12. 17..
 * Admin2 custom alrt , confirm plugin
 */

const alertPlugin = {

    install (Vue, options = {}) {

        if (this.installed) {
            return;
        }

        this.installed = true;

        const createDivInBody = () => {
            const div = document.createElement('div');
            //const mainApp = document.getElementById("app");
            //mainApp.appendChild(div);
            document.body.appendChild(div);
            return div
        }

        /* 동적 component Inject
        */
        const componentInject = (component) =>{
            const container = createDivInBody();
            Vue.prototype.$alertContainer = new Vue({
                parent: Plugin.rootInstance,
                render: h => h(component)
            }).$mount(container)
        }

        /* alert component 객체를 얻는다.
        */
        const getAlertComponent = (root)=> {
            if (Vue.prototype.$alertContainer == null){
                componentInject('common-alert');
            }
            return root._dynamicContainer;
        }

        /* 공통 alert 메소드
        */
        Vue.prototype.$alert = (msg,width,height) =>{

            const root = Plugin.rootInstance;
            const alertComponent = getAlertComponent(root);
            if (!alertComponent) return;

            return alertComponent.alert(false,msg,width,height);

        }

        Vue.prototype.$confirm = (msg,width,height) =>{

            const root = Plugin.rootInstance;
            const alertComponent = getAlertComponent(root);
            if (!alertComponent) return;

            return alertComponent.alert(false,msg,width,height);

        }

        Vue.mixin({
            beforeMount () {
                if (Plugin.rootInstance === undefined) {
                    Plugin.rootInstance = this.$root;
                }
            }
        })

        Vue.prototype.$alertContainer = null;
    }

}