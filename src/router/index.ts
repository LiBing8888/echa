import{createRouter,createWebHistory,createWebHashHistory} from 'vue-router';
import routes from './routes';


const router = createRouter({
    history: createWebHashHistory('/vis'),
    routes,
})
router.beforeEach((to,from,next) =>{
    next()
})
export default router;