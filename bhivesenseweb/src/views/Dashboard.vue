<template>
    <div class="dashboard">
        <div class="sb">
            <Sidebar />
        </div>
        
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
export default {
    name: 'home',
    components: {
        Sidebar
    }
}
</script>

<style scoped>
.dashboard {
    display: grid;
    grid-template-columns: 300px auto;
    /*height: 100vh;
    width: 100vw;*/
}

.content {
    background-color: #ebc002;
}

</style>