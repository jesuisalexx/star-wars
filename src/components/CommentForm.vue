<template>
  <div>
    <template v-if="snackbar">
      <div class="text-center">
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
        >
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn
              color="blue"
              text
              v-bind="attrs"
              @click="snackbar = !snackbar"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </template>
    <v-sheet
      elevation="3"
      class="comment-form"
      outlined
    >
      <div style="display: flex; flex-direction: column">
        <v-form ref="form"
          class="ml-4 mt-2 mr-3"
        >
          <v-text-field
            label="Name"
            class="pl-3"
            v-model="commentModel.title"
          />
        </v-form>
        <v-col
          style="width: 400px; height: 170px;"
        >
          <v-textarea
            solo
            label="Message"
            v-model="commentModel.body"
          />
        </v-col>
      </div>
      <v-btn
        elevation="2"
        class="mb-2 mr-2"
        @click="sendComment"
      >
        Submit
      </v-btn>
    </v-sheet>
  </div>
</template>

<script>
import { ref, toRefs } from '@vue/composition-api'
import { useStore } from '@/hooks/useStore'

export default {
  name: 'CommentForm',
  props: {
    action: {
      type: String,
      required: true
    },
    userId: {
      type: Number,
      required: true
    }
  },
  setup (props) {
    const { action, userId } = toRefs(props)

    const snackbar = ref(false)
    const text = ref('Ваш высер был успешно отправлен')
    const store = useStore()
    const commentModel = ref({
      title: '',
      body: '',
      userId: userId.value
    })
    const sendComment = async () => {
      const res = await store.dispatch(action.value, commentModel.value)
      console.log(action.value, commentModel.value)
      snackbar.value = !snackbar.value
      return {
        res
      }
    }
    return {
      commentModel,
      sendComment,
      snackbar,
      text,
      timeout: 3500
    }
  }
}
</script>

<style scoped>
.comment-form {
  width: 100%;
  height: 260px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
</style>
