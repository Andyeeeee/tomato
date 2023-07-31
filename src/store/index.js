// Utilities
import { createPinia } from 'pinia'
import PiniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(PiniaPluginPersistedstate)

export default pinia
