<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>通知</h1>
      </v-col>
      <v-col cols="12">
        <v-radio-group v-model="notify" inline>
          <v-radio label="開起" :value="true"></v-radio>
          <v-radio label="關閉" :value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12">
        <h1>設定</h1>
        <tr>
          <th>名稱</th>
          <th>功能</th>
          <th>選擇</th>
        </tr>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-table>
          <thead>
            <tr>
              <th>名稱</th>
              <th>功能</th>
              <th>選擇</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="suker in settings.alarms" :key="suker.id">
              <th>{{ suker.id }}</th>
              <th>
                <audio :src="suker.file" controls></audio>
              </th>
              <v-radio-group v-model="selectedAlarm">
                <v-radio :value="suker.id"></v-radio>
              </v-radio-group>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useSettingStore } from '@/store/settings'
import { storeToRefs } from 'pinia';


const settings = useSettingStore()
const { selectedAlarm, alarms, notify } = storeToRefs(settings)
</script>