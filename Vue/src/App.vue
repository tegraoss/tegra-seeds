<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <router-link :to="item.route">
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </router-link>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>
    <v-content>
      
      <router-view/>
      
    </v-content>
   
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { IMenuItem } from './interfaces/menu';

@Component
export default class App extends Vue {
  private clipped: boolean = true;
  private items: IMenuItem[] = [];
  private miniVariant: boolean = false;
  private title: string = 'Vue Seed';

  private beforeMount() {
    // Inicializar o Menu
    this.items = [{
      icon: 'dashboard',
      title: 'Dashboard',
      route: '/',
      role: ''
    },
    {
      icon: 'information',
      title: 'About',
      route: '/about',
      role: ''
    }];
  }
}
</script>
