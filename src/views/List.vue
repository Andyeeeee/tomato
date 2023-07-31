<template>
  <v-container>

    <v-row>
      <v-col cols="12">
        <h1>項目</h1>
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="newItem" label="新增事項" append-icon="mdi-plus" @click:append="onInputSubmit"
          @keydown.enter="onInputSubmit" :rules="[rules.required, rules.length]" ref="newItemInput"></v-text-field>
        <v-table>
          <thead>
            <tr>
              <th>名稱</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>

            <tr v-for="(item, i) in items" :key="item.id">
              <td>
                <v-text-field v-model="item.model" :rules="[rules.required, rules.length]" v-show="item.edit" autofocus
                  ref="editItemInput" @keydown.enter="onEditInputSubmit(item.id, i)"></v-text-field>
                <!-- 要傳i 的話v-for也要+i 並刮起來 家i一部分也是為了接收的到ref="" -->
                <span v-show="!item.edit">
                  {{ item.name }}
                </span>
              </td>
              <td>
                <template v-if="item.edit">
                  <v-btn icon="mdi-check" color="black" variant="text" @click="onEditInputSubmit(item.id, i)"></v-btn>
                  <v-btn icon="mdi-undo" color="wihte" variant="text" @click="cancelEditItem(item.id)"></v-btn>
                </template>
                <template v-else>
                  <v-btn icon="mdi-pencil" color="yellow" variant="text" @click="editItem(item.id)"></v-btn>
                  <v-btn icon="mdi-delete" color="green" variant="text" @click="delItem(item.id)"></v-btn>
                </template>
              </td>
            </tr>

            <tr v-if="items.length === 0">
              <td colspan="2" class="text-center">沒有事項
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col cols="12">
        <h1>已完成事項</h1>
      </v-col>
      <v-col cols="12">
        <v-table>
          <thead>
            <tr>
              <td>名稱</td>
              <td>操作</td>
            </tr>



          </thead>
          <tbody>
            <tr v-for="item in finishedItems" :key="item.id">
              <td>{{ item.name }}</td>
              <td>
                <v-btn icon="mdi-delete" color="green" variant="text" @click="delFinishedItems(item.id)"></v-btn>
              </td>
            </tr>
            <tr v-if="finishedItems.length === 0">
              <td colspan="2" class="text-center">沒有事項</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import { ref } from 'vue'
import { useListStore } from '@/store/list'
import { storeToRefs } from 'pinia'

const list = useListStore()
const { addItem, editItem, cancelEditItem, delItem, confirmEditItem, delFinishedItems } = list
const { items, finishedItems } = storeToRefs(list)

const newItem = ref('')
const newItemInput = ref(null)
const editItemInput = ref([])// 在 v-for in 這是陣列  所以鎮鞭打[]比較好


const onInputSubmit = async () => {
  const validate = await newItemInput.value.validate()
  console.log(validate)
  if (validate.length > 0) return
  addItem(newItem.value)
  newItemInput.value.blur()
  newItemInput.value.reset()
}

const onEditInputSubmit = async (id, i) => {
  const validate = await editItemInput.value[i].validate()
  console.log(validate)
  if (validate.length > 0) return
  confirmEditItem(id)
}




const rules = {
  required: (value) => Boolean(value) || "欄位必須",
  length: (value) => value.length >= 3 || "字元必須大於3"
}
</script>