// Utilities
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('settings', {
  state: () => ({
    alarms: [
      { id: 1, name: 'alarm', file: new URL('@/assets/alarm.mp3', import.meta.url).href },
      { id: 2, name: 'yay', file: new URL('@/assets/yay.mp3', import.meta.url).href }
    ],
    selectedAlarm: 1,
    notify: false //預設
    //預設值
    // new URLO('@/assets/alarm.mp3')
    // new URLO('@/assets/yay.mp3')
    //
  }),
  getters: {
    selectedAlarmFile() {
      const i = this.alarms.findIndex(alarm => alarm.id === this.selectedAlarm)
      return this.alarms[i].file
    }
  },
  persist: {
    key: 'pomodoro-settings',
    path: [
      'selectedAlarm', 'notify'
    ]
  }
})
