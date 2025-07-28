<template>
  <div v-if="showModal" class="application-modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div v-if="!applicationSubmitted">
        <h3>Application Portal</h3>
        <p>You wish to join our {{ selectedRole }} ranks? The ritual demands commitment.</p>
        <div class="form-group">
          <input v-model="applicationForm.email" type="email" placeholder="Your email..." />
          <textarea v-model="applicationForm.message"
                    placeholder="Tell us of your dark talents..."></textarea>
        </div>
        <div class="modal-actions">
          <button class="submit-application" @click="submitApplication">Submit Application</button>
          <button class="close-modal" @click="closeModal">Retreat</button>
        </div>
      </div>
      <div v-else>
        <h3>Submission Received</h3>
        <p>Your application has been cast into the void. The council will deliberate.</p>
        <button class="close-modal" @click="closeModal">Return to Realm</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from '../composables/useStore'

export default {
  name: 'ApplicationModal',
  setup() {
    const store = useStore()
    
    const showModal = computed(() => store.showModal.value)
    const selectedRole = computed(() => store.selectedRole.value)
    const applicationSubmitted = computed(() => store.applicationSubmitted.value)
    const applicationForm = computed(() => store.applicationForm)

    const closeModal = () => {
      store.showModal.value = false
    }

    const submitApplication = () => {
      if (applicationForm.value.email && applicationForm.value.message) {
        store.applicationSubmitted.value = true
        console.log('Application submitted:', {
          role: selectedRole.value,
          email: applicationForm.value.email,
          message: applicationForm.value.message
        })
      }
    }

    return {
      showModal,
      selectedRole,
      applicationSubmitted,
      applicationForm,
      closeModal,
      submitApplication
    }
  }
}
</script>

<style scoped>
.application-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: modal-fade-in 0.3s ease;
}

.modal-content {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 3rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
  color: #D6B85A;
}

.modal-content h3 {
  margin-bottom: 1rem;
  color: #2563EB;
}

.modal-content p {
  margin-bottom: 2rem;
  color: #94A3B8;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #D6B85A;
  margin-bottom: 1rem;
  font-family: 'Orbitron', monospace;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.submit-application {
  background: linear-gradient(45deg, #2563EB, #1E3A8A);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  font-family: 'Orbitron', monospace;
}

.close-modal {
  background: transparent;
  color: #E0F2FE;
  border: 2px solid #E0F2FE;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  font-family: 'Orbitron', monospace;
}

@keyframes modal-fade-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
</style>