<template>
  <div>
    <div class="home flex">
      <div
        class="sidebar  h-screen w-[20%] bg-slate-300 dark:bg-slate-900 text-white flex flex-col items-center p-10 gap-5"
      >
        <div class="dark:text-white text-black">
          <div @click="changeLanguage2('id')">id</div>
          <div @click="changeLanguage2('en')">en</div>
          <!-- <div @click="changeLanguage()">{{ $t("test.lang") }}</div> -->
          <button @click="toggleDark()">test</button>
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="isDark"
              @change="toggleDark()"
              class="sr-only peer"
            />
            <div
              class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            ></div>
          </label>
        </div>
        <div
          v-for="menu in pages"
          :key="menu.name"
          class=" text-black dark:text-white"
        >
          <div
            @click="handleClickMenu(menu)"
            v-if="menu.children && menu.children.length > 0"
            class="flex gap-5"
          >
            <div class="icons">
              <i :class="menu.icon"></i>
            </div>
            <div class="title-menu">
              <p>{{ menu.text }}</p>
            </div>
          </div>
          <router-link
            :to="menu.href"
            class="flex gap-5"
            tag="div"
            @click.native="handleClickMenu(menu)"
            v-else
          >
            <div class="icons">
              <i :class="menu.icon"></i>
            </div>
            <div class="title-menu">
              <p>{{ menu.text }}</p>
            </div>
          </router-link>
        </div>
      </div>

      <div class="nav-side absolute left-80 bg-white h-screen">
        <div
          class="sub-sidebar open p-7"
          v-if="
              expandedMenu &&
              expandedMenu.children.length > 0 &&
              showExpandedMenu
          "
        >
          <div class="">
            <div class="">
              <div class="header text-2xl font-bold pb-5">
                <p>{{ expandedMenu.text }}</p>
              </div>
              <div class="body">
                <router-link
                  v-for="submenu in submenus"
                  :to="submenu.href"
                  tag="li"
                  active-class="active"
                  :key="submenu.href"
                  class="flex"
                >
                  <div class="flex gap-2" @click="test(submenu.href)">
                    <div class="icons">
                      <i :class="submenu.icon"></i>
                    </div>
                    <div class="title-menu">
                      <p>
                        {{ submenu.text }}
                      </p>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="main-page w-[80%] h-[100%]">
        <!--  -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { useDark} from "@vueuse/core";
import Functions from "../tools/functions"

export default {
    data() {
        return {
            expandedMenu: undefined,
            showExpandedMenu: false,
            IsActive: "",
            isDark: useDark(),
            locale: ""
        }
    },
    methods: {
        toggleDark() {
          const page_router = this.$route.path
          return Functions.toggleDarkMode(page_router)
        },
        getLanguage() {
            let lang = localStorage.getItem("locale");
            if (lang == null) {
                lang = 'id';
            }
            this.$validator.localize('' + lang + '');
            if (lang == "en") {
                this.$i18n.locale = "en"
                return "English"
            } else {
                this.$i18n.locale = "id"
                return "Bahasa Indonesia"
            }
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
        },

        changeLanguage2(lang) {
          this.$i18n.locale = lang;
          this.locale = lang;
          // Validator.locale = lang;
          this.$validator.localize(lang);
          Functions.SaveSessionCustom("page_router", this.$route.path);
          Functions.SaveSessionCustom("lang", lang);
          return Functions.ToPage("/loading");
        },

        test(href) {
          this.toggleMenu(false)
          if (href && this.$route.path !== href) {
          this.$router.push(href);
          } else {
            this.toggleMenu(false)
          }
        },
        setExpandedMenu(menu) {
          this.expandedMenu = menu;
        },
        toggleMenu(val) {
          this.showExpandedMenu = val;
        },
        handleClickMenu(menu) {
          this.setExpandedMenu(menu);
          this.toggleMenu(true);
        },
        ActiveMenu() {
          Functions.MenuActive();
        },
    },

    computed: {
        pages() {
          return [
            {
              name: "s1",
              text: "Semester 1",
              icon: "jam jam-world",
              href: "",
              children: [
                {
                  name: "s1s1",
                  text: "Sesi 1",
                  icon: "jam jam-world",
                  href: "/semester-1/sesi-1",
                },
                {
                  name: "s1s2",
                  text: "Sesi 2",
                  icon: "jam jam-world",
                  href: "/semester-1/sesi-2",
                },
                {
                  name: "s1s3",
                  text: "Sesi 3",
                  icon: "jam jam-world",
                  href: "/semester-1/sesi-3",
                },
                {
                  name: "s1s4",
                  text: "Sesi 4",
                  icon: "jam jam-world",
                  href: "/semester-1/sesi-4",
                },
                {
                  name: "s1s5",
                  text: "Sesi 5",
                  icon: "jam jam-world",
                  href: "/semester-1/sesi-5",
                },
                {
                  name: "s1s6",
                  text: "Sesi 6",
                  icon: "jam jam-world",
                  href: "/semester-1/sesi-6",
                },
                {
                  name: "s1s7",
                  text: "Sesi 7",
                  icon: "jam jam-world",
                  href: "/semester-1/sesi-7",
                },
                {
                  name: "s1s8",
                  text: "Sesi 8",
                  icon: "jam jam-world",
                  href: "/semester-1/sesi-8",
                },
                {
                  name: "s1s9",
                  text: "Sesi 9",
                  icon: "jam jam-world",
                  href: "/semester-1/sesi-9",
                },
                {
                  name: "s1s10",
                  text: "Sesi 10",
                  icon: "jam jam-world",
                  href: "/semester-1/sesi-10",
                },
              ],
            },
            {
              name: "ch2",
              text: "Semester 2",
              icon: "jam jam-grid",
              href: "/pages1",
              children: [],
            },
            {
              name: "s3",
              text: "pages 3",
              icon: "jam jam-shield-check",
              href: "",
              children: [
              ]
            },
          ];
        },
        submenus() {
          return this.expandedMenu ? this.expandedMenu.children : [];
        },
    }

}
</script>

<style></style>
