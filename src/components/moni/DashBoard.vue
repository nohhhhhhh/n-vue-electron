<template>
  <div>
    <!--http://materialdesignicons.com/cdn/2.0.46/-->
    <div style="margin: 10px"><v-icon @click="addItem" size="30">mdi-chart-line mdi-36px</v-icon></div>
    <grid-layout
        :layout.sync="layout"
        :col-num="colNum"
        :row-height="80"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="false"
        :responsive="true"
        :prevent-colllision="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
        @layout-updated="layoutUpdatedEvent"
    >
      <grid-item v-for="item in layout"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 :key="item.i"
                 :class="item.i"
      >

          <v-flex md12 sm12>
            <material-chart-card
                :data="dailySalesChart.data"
                :options="dailySalesChart.options"
                color="warning"
                type="Line"
            >
              <h1 class="title font-weight-thin">Daily StackOverflow Visits</h1>

              <p class="category d-inline-flex font-weight-light" id="ddd" v-bind:style="{height: (item.h*60)+'px'}">
                <v-icon color="green" small>mdi-arrow-up</v-icon>
                <span class="green&#45;&#45;text">55%</span>&nbsp;increase in today's visits
              </p>

              <template slot="actions">
                <v-icon class="mr-2" small>
                  mdi-clock-outline
                </v-icon>
                <span class="caption grey-lighten-1&#45;&#45;text font-weight-light">updated 4 minutes ago</span>
              </template>

            </material-chart-card>
          </v-flex>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import {mapState} from "vuex";
import VueGridLayout from 'vue-grid-layout';

export default {
  name: 'Dashboard',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data () {
    return {
      colNum: 12,
      layout: [
        {"x":0,"y":0,"w":4,"h":2,"i":"0","minW":4}
      ],
      dailySalesChart: {
        data: {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
            [12, 17, 7, 17, 23, 18, 38]
          ]
        },
        options: {
        }
      },
      headers: [
        {
          sortable: false,
          text: 'ID',
          value: 'id'
        },
        {
          sortable: false,
          text: 'Name',
          value: 'name'
        },
        {
          sortable: false,
          text: 'Salary',
          value: 'salary',
          align: 'right'
        },
        {
          sortable: false,
          text: 'Country',
          value: 'country',
          align: 'right'
        },
        {
          sortable: false,
          text: 'City',
          value: 'city',
          align: 'right'
        }
      ],
      items: [
        {
          name: 'Dakota Rice',
          country: 'Niger',
          city: 'Oud-Tunrhout',
          salary: '$35,738'
        },
        {
          name: 'Minerva Hooper',
          country: 'Curaçao',
          city: 'Sinaai-Waas',
          salary: '$23,738'
        }, {
          name: 'Sage Rodriguez',
          country: 'Netherlands',
          city: 'Overland Park',
          salary: '$56,142'
        }, {
          name: 'Philip Chanley',
          country: 'Korea, South',
          city: 'Gloucester',
          salary: '$38,735'
        }, {
          name: 'Doris Greene',
          country: 'Malawi',
          city: 'Feldkirchen in Kārnten',
          salary: '$63,542'
        }
      ],
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      }
    }
  },
  computed: {
    ...mapState('app', ['image', 'color'])
  },
  methods: {
    addItem: function () {
      let idx = this.layout.length;
      this.layout.push({
        "x": (this.layout.length * 2) % (this.colNum || 12),
        "y": this.layout.length + (this.colNum || 12),
        "w": 4,
        "h": 2,
        "i": idx,
        "minW":4
      });
    },
    complete (index) {
      this.list[index] = !this.list[index]
    },
    layoutUpdatedEvent: function(newLayout){
      console.log("Updated layout: ", newLayout)
    }
  }
}
</script>
<style scoped>
.vue-grid-item {
  height: fit-content!important;
}
</style>
