<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import httpService from '@/services/httpService';

const state = reactive({
    list: []
});

const router = useRouter();

onMounted( async () => {
    const result = await httpService.findAll();
    state.list = result;
});

const moveToDetail = id => {
    router.push({
        path: `/detail/${id}`
    });
}


</script>

<template>
<h3>게시판 리스트</h3>

<div v-if="state.list.length === 0"> 작성된 글이 없습니다.</div>
<table v-else>
    <tr>
        <th>글번호</th>
        <th>제목</th>
        <th>작성일</th>
    </tr>

    <tr v-for="item in state.list" :key="item.id"
    @click="moveToDetail(item.id)">
        <td>{{ item.id }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.createdAt }}</td>


    </tr>
</table>
</template>

<style scoped>
table {border-collapse: collapse;}
table, th, td{ border: 1px solid #000000;}
th,td {padding: 10px;}
td {cursor: pointer;}
tr:hover {background-color:aliceblue }
tr:first-child {background-color: #ccc;}

</style>