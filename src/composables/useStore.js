import { ref, reactive } from 'vue'

const showModal = ref(false)
const selectedRole = ref('')
const applicationSubmitted = ref(false)

const applicationForm = reactive({
  email: '',
  message: ''
})

export function useStore() {
  const showApplicationModal = (role) => {
    selectedRole.value = role
    showModal.value = true
    applicationSubmitted.value = false
    applicationForm.email = ''
    applicationForm.message = ''
  }

  return {
    showModal,
    selectedRole,
    applicationSubmitted,
    applicationForm,
    showApplicationModal
  }
}