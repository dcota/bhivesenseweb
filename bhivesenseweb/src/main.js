import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Notifications from '@kyvg/vue3-notification'
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';

const app = createApp(App);


app.use(router);
app.use(store);
app.use(Notifications);
app.use(VCalendar, {

});

app.mount('#app');