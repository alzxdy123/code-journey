<template>
  <div clas="status-loading">
    <div class="page-loading">
      <!-- <b-spinner variant="primary"  label="Spinning"></b-spinner> -->
      loading
    </div>
  </div>
</template>

<script>
import Functions from '../../tools/functions';
export default {
    data() {
        return {

        }
    },
    methods: {
        Loading() {
            let PageRefresh         =       Functions.ReadSessionCustom('page_router');
            setTimeout(() => {
                return Functions.ToPage(PageRefresh);
            }, 200);
        }
    },
    mounted: function() {
        this.Loading();
    }
}
</script>
