import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

export default {
    namespaced: true,
    state() {
        return {
            _id: '',
            token: '',
            firstname: '',
            lastname: '',
            level: '',
            img: '',
            detailid: '',
            expiresIn: 'sss',
            autoLogout: false,
            apidtoedit: ''
        }
    },
    mutations,
    getters,
    actions
}