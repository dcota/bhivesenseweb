<template>
    <div class="dashboard">
        <Sidebar/>
        <div class="content text-center">
            <router-view/>
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

<style>
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