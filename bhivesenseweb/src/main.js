import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Notifications from '@kyvg/vue3-notification'
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import mitt from 'mitt'
//import OneSignalVuePlugin from '@onesignal/onesignal-vue3'

const emitter = mitt()

const app = createApp(App);


app.use(router);
app.use(store);
app.use(Notifications);
app.use(VCalendar, {

});
app.use(VueChartkick);
/*app.use(OneSignalVuePlugin, {
    appId: '17b2ac3d-5ba5-46e5-b1a5-54bfd9598af8',
})*/

app.config.globalProperties.emitter = emitter

app.mount('#app');