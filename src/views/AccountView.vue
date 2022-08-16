<template>
    <app-header />
    <div class="flex flex-row">
        <sidebar-comp />
        <!-- <component :is="$route.meta.componentName" :items="bookmarkList" /> -->
        <!-- {{ $log($route) }} -->
        <!-- <app-bookmark-list v-if="bookmarkList.length > 0" :items="bookmarkList" />
        <div v-else>Bookmark bulunmamaktadır..</div> -->
    </div>

</template>

<script>
import sidebarComp from "@/components/Account/sidebarComp.vue"
export default {
    components: {
        sidebarComp
    },
    data() {
        return {
            bookmarkList: [],
            socket: {}
        }
    },
    created() {
        this.$appAxios.get("/bookmarks?_expand=category&_expand=user").then(bookmark_list_response => {
            // console.log('bookmark_list_response :>> ', bookmark_list_response);
            this.bookmarkList = bookmark_list_response?.data || [];
        })
    },
    mounted() {
        this.$socket.on("WELCOME_MESSAGE", this.WELCOME_MESSAGE);
    },
}
</script>