<template>
  <div class=" w-full h-screen flex flex-col dark:text-white">
    <div
      class="navbar w-full h-[10%] flex justify-center items-center gap-10 bg-red-500"
    >
      <div
        v-for="list in pages"
        :key="list.nav"
        class=" cursor-pointer text-white"
        @click="handdleClick(list)"
        :class="{ 'border-b-4 border-white': list === selectedListItem }"
      >
        {{ list.nav }}
      </div>
    </div>
    <div
      class="main-page bg-white dark:bg-slate-700 w-full flex justify-center items-center h-[80%]"
    >
      <div v-if="selectedListItem" v-html="selectedListItem.home"></div>
    </div>
    <footer
      class="w-full bg-red-500 flex justify-center items-center h-[10%] text-white"
    >
      {{ selectedListItem.footer }}
    </footer>
  </div>
</template>

<script>
 ""
export default {
    data() {
        return {
            selectedListItem: "",
            pages: [
                {
                    nav: "Home",
                    home: '<i class="jam jam-youtube text-9xl text-red-600"></i>',
                    footer: "Home Footer"
                },
                {
                    nav: "About me",
                    home: 'about',
                    footer: "About Footer"
                },
                {
                    nav: this.$t("semester1.sesi1.contact"),
                    home: 'contact',
                    footer: "Contact Footer"
                }
            ]
        }
    },
    methods: {
        handdleClick(list) {
            this.selectedListItem = list;
        },
        changeLanguage() {
            let lang = localStorage.getItem("locale")
            if (lang == "en")
                lang = "id"
            else
                lang = "en"
            localStorage.setItem("locale", lang)
            this.$validator.localize(lang);
            this.$i18n.locale = lang
            // console.log(lang)
            location.reload()
        },
    },
    mounted() {
        this.selectedListItem = this.pages[0];
    },
}
</script>

<style></style>
