//router
import { RouteRecordRaw } from 'vue-router';
import home from '@/pages/home.vue'
import other from '@/pages/other.vue'
import other1 from '@/pages/other1.vue'
import other2 from '@/pages/other2.vue'
import other3 from '@/pages/other3.vue'
const routes: Array<RouteRecordRaw> = [
    { path: '/', component: home,meta:{index:1}  },
    { path: '/other', component: other,meta:{index:0}  },
    { path: '/other1', component: other1,meta:{index:2} },
    { path: '/other2', component: other2,meta:{index:3} },
    { path: '/other3', component: other3,meta:{index:4} },
    
]
export default routes

