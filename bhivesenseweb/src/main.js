import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Notifications from '@kyvg/vue3-notification'
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

const app = createApp(App);


app.use(router);
app.use(store);
app.use(Notifications);
app.use(VCalendar, {

});
app.use(VueChartkick);

app.mount('#app');