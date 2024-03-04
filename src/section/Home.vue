<template>
  <div>
    <div class="home flex">
      <div
        class="sidebar h-screen w-[250px] bg-slate-900 text-white flex flex-col items-center p-10 gap-5"
      >
        <div v-for="menu in pages" :key="menu.name" class=" text-white">
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

      <div class="nav-side bg-red-600">
        <div
          class="sub-sidebar open bg-blue-500 p-7"
          v-if="
              expandedMenu &&
              expandedMenu.children.length > 0 &&
              showExpandedMenu
          "
        >
          <div class="border-black border">
            <div class="border border-red-600">
              <div class="header">
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
                  <div class="flex bg-yellow-400" @click="test(submenu.href)">
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

      <div class="main-page">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            expandedMenu: undefined,
            showExpandedMenu: false,
            IsActive: "",
        }
    },
    methods: {
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
            // location.reload()
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
          name: "pages1",
          text: "pages 1",
          icon: "jam jam-grid",
          href: "/pages1",
          children: [],
        },
        {
          name: "pages2",
          text: "pages 2",
          icon: "jam jam-world",
          href: "",
          children: [
            {
              name: "pages2-children1",
              text: "pages2-children1",
              icon: "jam jam-world",
              href: "/pages2-children1",
            },
            {
              name: "pages2-children2",
              text: "pages2-children2",
              icon: "jam jam-world",
              href: "/pages2-children2",
            },
          ],
        },
        {
          name: "pages3",
          text: "pages 3",
          icon: "jam jam-shield-check",
          href: "/pages3",
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
