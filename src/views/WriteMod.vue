<script setup>
import { onMounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import httpService from '@/services/httpService';

const route = useRoute();
const router = useRouter();

const state = reactive({
    mode:'등록',
    board2:{
        id:0,
        title:'',
        contents:''
    }
});
const submit = async()=>{
    if(!state.board2.title){
        alert('제목을 입력해 주세요!');
        return;
    } else if(!state.board2.contents) {
        alert('내용을 입력해 주세요!');
        return;
    }

    const result = await(state.board2.id ? httpService.update(state.board2) : httpService.save(state.board2));
    
    if(!result) {
        alert(`글 ${state.mode}에 실패하였습니다.`);
        return;
    }

    const path = state.board2.id ? `/detail/${state.board2.id}` : '/';
    router.push(path)
}

onMounted(async () => {
    if(route.params.id){
        state.mode = '수정';
        const id = route.params.id;
        state.board2 = await httpService.findById(id);
    }
});
</script>

<template>
<h3> 테스트중{{ state.mode }} </h3>
<div>
    <label>제목 : <input type="text" v-model="state.board2.title"></label>
</div>
<div>
    <label>내용: <textarea v-model="state.board2.contents"></textarea> </label>
</div>
<div>
    <button @click="submit">저장</button>
</div>
</template>

<style scoped>

</style>