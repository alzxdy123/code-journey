<template>
  <div
    class=" w-full h-screen flex justify-center items-center dark:bg-black dark:text-white"
  >
    <div class="flex flex-col w-32 justify-center items-center">
      <img :src="imgSrc" class="w-20 pb-10" />
      <i class="jam jam-lightbulb-f text-yellow-400"></i>
      <div class="w-full flex justify-center items-center">
        <label class="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            v-model="isDark"
            @change="handdleToggle()"
            class="sr-only peer"
          />
          <div
            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import Functions from "@/tools/functions"
import {useDark} from "@vueuse/core"
export default {
  data() {
    return {
        isDark: useDark(),
        imgSrc: ""
    }
  },
  methods: {
    readImage() {
      if(this.isDark === true) this.imgSrc = require("../../../assets/off.gif")
      else this.imgSrc = require("../../../assets/on.gif")
    },
    handdleToggle() {
      const page_router = this.$route.path
      return Functions.toggleDarkMode(page_router)
    }
  },
  mounted() {
    this.readImage()
    // console.log("dark", this.isDark)
  }
}
</script>

<style></style>
