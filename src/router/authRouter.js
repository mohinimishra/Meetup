import Store from '../store'
export default (to, from, next) => {
    if (Store.getters.validateUser) {
        next()
    } else {
        next('/signin')
    }
}