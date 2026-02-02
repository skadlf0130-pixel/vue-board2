<script setup>
import httpService from '@/services/httpService';
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const state = reactive({
    data:{
        id:0,
        title: '',
        contents:'',
        createdAt:''    
    }
});

onMounted(async () => {
    const id = route.params.id;
    state.data = await httpService.findById(id);
});

const doDelete = async () => {
    if(!confirm('삭제하시겠습니까?')){
        return;
    }
    const params = {
        id: state.data.id
    }

    const result = await httpService.delete(params);
    
    if(result === 1){
        router.push('/');
    }

}
</script>

<template>
<h3>Detail</h3>
<div>글번호:{{ state.data.id }}</div>
<div>제목:{{ state.data.title }}</div>
<div>작성일:{{ state.data.createdAt }}</div>
<div>내용:{{ state.data.contents }}</div>
<div>
    <button @click="doDelete">삭제</button>
    <router-link :to="`/mod/${state.data.id}`">
        <button>수정</button>
    </router-link>
</div>
</template>

<style scoped>

</style>