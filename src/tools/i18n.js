import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

function MessageLocal() {
  const locales = require.context(
    "./language",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
  messages: MessageLocal(),
});

{
  /* <span>{{ $t("test.lang") }}</span>
    <button @click="changeLanguage()">{{ getLanguage() }}</button>

    <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              right
            >
              <template #button-content>
                <i class="jam jam-language"></i>
                <span>
                  {{ languageName }}
                </span>
              </template>
              <b-dropdown-item @click="ChangeLanguage('id')">
                <span>Indonesia</span>
              </b-dropdown-item>
              <b-dropdown-item @click="ChangeLanguage('en')">
                <span>English</span>
              </b-dropdown-item>
            </b-dropdown> */
  //   ChangeLanguage(language) {
  //       this.$i18n.locale = language;
  //       this.locale = language;
  //       Validator.locale = language;
  //       Functions.SaveSessionCustom("page_router", this.$route.path);
  //       Functions.SaveSessionCustom("language", language);
  //       return Functions.ToPage("/loading");
  //     },
  // languageName() {
  //       return this.$i18n.locale == "id" ? "Indonesia" : "English";
  //     },
}
