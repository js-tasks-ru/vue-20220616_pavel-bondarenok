<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': isLoading }"
      :style="backGroundImageUrl"
      @click="removeFile"
    >
      <span class="image-uploader__text">{{ labelDescription }}</span>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        :disabled="isLoading"
        @change="uploadFile"
      />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

interface DataSet {
  tempImage: string;
  isLoading: boolean;
}

export default defineComponent({
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: String,
    uploader: Function,
  },
  emits: ['select', 'upload', 'error', 'remove'],
  data(): DataSet {
    return {
      tempImage: this.preview as string,
      isLoading: false,
    };
  },
  computed: {
    backGroundImageUrl: {
      get(): string {
        if (this.tempImage) {
          return `--bg-url: url('${this.tempImage}')`;
        }
        return '';
      },
      set(value: string): void {
        this.tempImage = value;
      },
    },
    labelDescription(): string {
      if (this.isLoading) {
        return 'Загрузка...';
      }
      if (this.backGroundImageUrl) {
        return 'Удалить изображение';
      }
      return 'Загрузить изображение';
    },
  },
  watch: {
    preview(newUrl: string, oldUrl: string): void {
      this.backGroundImageUrl = newUrl;
    },
  },
  methods: {
    async uploadFile(): Promise<void> {
      this.isLoading = true;

      const [file] = (this.$refs.fileInput as HTMLInputElement).files as FileList;
      this.backGroundImageUrl = URL.createObjectURL(file);
      this.$emit('select', file);

      if (this.uploader) { //this.uploader instanceof Function doesn't work
        try {
          const uploadResult = await this.uploader(file);
          this.$emit('upload', uploadResult);
        } catch (ex) {
          (this.$refs.fileInput as HTMLInputElement).value = '';
          this.backGroundImageUrl = '';
          this.$emit('error', ex);
        }
      }
      this.isLoading = false;
    },
    removeFile(event: Event): void {
      if (this.isLoading) {
        return;
      }
      if (this.backGroundImageUrl) {
        event.preventDefault();
        (this.$refs.fileInput as HTMLInputElement).value = '';
        this.backGroundImageUrl = '';
        this.$emit('remove');
      }
    },
  },
});
</script>

<style scoped>
.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
