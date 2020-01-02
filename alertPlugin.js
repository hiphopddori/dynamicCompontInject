/**
 * Created by kic(ddori) on 2019. 12. 17..
 * Admin2 custom alrt , confirm, loading plugin
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
            return div;
        }

        /* 동적 component Inject
        */
        const componentInject = (component) =>{
            const container = createDivInBody();
            Vue.prototype[component] = new Vue({
                parent: Plugin.rootInstance,
                render: h => h(component)
            }).$mount(container);
        }

        /* alert component 객체를 얻는다.
        */
        const getInjectComponent = (root, componentName)=> {
            if (!Vue.prototype.hasOwnProperty(componentName)){
                componentInject(componentName);
            }
            return root[componentName];
        }

        /* 공통 alert 메소드
        */
        Vue.prototype.$alert = (msg,width,height) =>{

            const root = Plugin.rootInstance;
            const alertComponent = getInjectComponent(root,'commonAlert');
            if (!alertComponent) return

            return alertComponent.alert(false,"알 림",msg,width,height);

        }

        Vue.prototype.$confirm = (msg,title='알림',width,height) =>{

            const root = Plugin.rootInstance;
            const alertComponent = getInjectComponent(root,'commonAlert');
            if (!alertComponent) return;
            /*
            if (title === undefined){
                title = "알 림"
            }
            */

            return alertComponent.alert(true,title,msg,width,height);

        }

        Vue.prototype.$loading = (isLoading) =>{
            const root = Plugin.rootInstance;
            const loadingComponent = getInjectComponent(root, 'loading');
            if (!loadingComponent) return;

            return loadingComponent.on(isLoading);

        }

        Vue.mixin({
            beforeMount () {
                if (Plugin.rootInstance === undefined) {
                    Plugin.rootInstance = this.$root;
                }
            }
        })

        //Vue.prototype["commonAlert"] = null;
        //Vue.prototype["loading"] = null;
    }

}
