<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app dark>
      <!---USer Area -->
      <v-list-item class="profile-bg px-2">
        <v-list-item-avatar>
          <v-icon class="primary"> mdi-account </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="white--text text-button">
            {{ $auth.user.email}}
          </v-list-item-title>
          <v-list-item-subtitle class="blue--text text-caption">
            Logged In
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!---USer Area -->

      <v-list dense nav>
        <v-list-item
          v-for="(menu, i) in menus"
          :key="i"
          :to="menu.route"
          router
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed elevation="0" color="primary" dark dense app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer></v-spacer>
      <!-- <v-toolbar-title>{{ title }}</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-btn small text @click="$auth.logout()"
        ><v-icon>mdi-logout</v-icon></v-btn
      >
    </v-app-bar>
    <v-main>
      <Nuxt class="pa-4" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
  name: "DefaultLayout",
  data() {
    return {
      drawer: true,
      menus: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          route: "/",
        },
        {
          icon: "mdi-account",
          title: "Student List",
          route: "/student-list",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "ACTIVITY 1",
    };
  },
};
</script>
<style scoped lang="scss">
.profile-bg {
  //background: url('../assets/images/user-info.jpg') no-repeat;
  background: url("../static/user-info.jpg") no-repeat;
}
.v-avatar {
  padding: 45px 0;
}
</style>
