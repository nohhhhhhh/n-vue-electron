<template>
  <div>
    <!--http://materialdesignicons.com/cdn/2.0.46/-->
    <div style="margin: 10px"><v-icon @click="addItem" size="30">mdi-chart-line mdi-36px</v-icon></div>
    <grid-layout
        :layout.sync="itemList"
        :col-num="colNum"
        :row-height="80"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="false"
        :responsive="true"
        :prevent-colllision="true"
        :margin="[5, 5]"
        :use-css-transforms="true"
        @layout-updated="layoutUpdatedEvent"
        @layout-created="layoutCreatedEvent"
    >
      <grid-item v-for="item in itemList"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 :key="item.i"
                 :class="item.i"
      >

          <v-flex md12 sm12>
            <material-card color="warning" type="Line">
              <v-card-title class="display-1">
                <!--<span class="headline">Menu</span>-->
              <h1 class="title font-weight-thin">Daily StackOverflow Visits</h1>
              <v-spacer></v-spacer>
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn dark icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item v-for="(item, i) in menu" :key="i">
                    <v-list-item-title><v-icon small @click="settingItem(item.id)">{{item.icon}}</v-icon></v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              </v-card-title>

              <!--<p class="category d-inline-flex font-weight-light" id="ddd" v-bind:style="{height: (item.h*60)+'px'}">-->
                <line-chart v-if="item.type == 'lineChart'" :chart-data="item.data" :options="lineChartOption" :ref="'chart'+item.i"></line-chart>
                <bar-chart v-if="item.type == 'barChart'" :chart-data="item.data" :options="{responsive: true, maintainAspectRatio: false}"></bar-chart>
              <!--</p>-->

              <template slot="actions">
                <v-icon class="mr-2" small>
                  mdi-clock-outline
                </v-icon>
                <span class="caption grey-lighten-1&#45;&#45;text font-weight-light">updated 4 minutes ago</span>
              </template>

            </material-card>
          </v-flex>
      </grid-item>
    </grid-layout>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">
            <v-icon>mdi-delete-empty</v-icon>
          </v-card-title>
          <v-card-text>Item 을 삭제 하시겠습니까?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="error"
                rounded
                small
                text
                @click="dialog = false"
            >
              취소
            </v-btn>
            <v-btn
                color="success"
                rounded
                small
                text
                @click="dialog = false"
            >
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import lineChart from '../../components/core/chart/LineChart'
import barChart from '../../components/core/chart/BarChart'
/*import data from '/src/assets/data/setting.json';*/

export default {
  name: 'Dashboard',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    lineChart,
    barChart
  },
  data () {
    return {
      colNum: 12,
      dialog:false,
      /*todo : localDb or Setting file*/
      menu: [
        {id:'s',title:'test', icon:"mdi-wrench"},
        {id:'d',title:'delete', icon:"mdi-delete-empty"},
      ],
      /*todo : localDb*/
      itemList: [
        {
          "socketConnect": "",
          "socketUrl" : "http://localhost:8080/commonSocket",
          "x":0,
          "y":0,
          "w":4,
          "h":2,
          "i":"0",
          "minW":4,
          "type": "lineChart",
          "data":{
            "datasets": [
              {
                "data": [{x:new Date(),y:150}]
              }
            ]
          }
        }
      ]
      ,
      layout: [
        {"x":0,"y":0,"w":4,"h":2,"i":"0","minW":4}
      ],
      lineChartOption:{
        animation: false,
        parsing:false,
        spanGaps : true,
        normalized:true,
        legend: {
          display: false
        },
        hover: {
          animationDuration: 0
        },
        elements: {
          line: {
            tension: 0, // disables bezier curves
            fill: false,
            /*stepped: false,*/
            borderDash: []
          }
        },
        tooltips:{
          enabled : false
        },
        responsiveAnimationDuration: 0, // animation duration after a resize
        scales: {
          xAxes: [{
            type:'time',
            autoSkip: true,
            time:{
              unit:'second',
              displayFormats: {
                second: 'HH:mm:ss'
              }
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
              fontSize: 8,
              maxRotation: 0,
              minRotation: 0
            },
            distribution :'series',
            gridLines: {
              drawOnChartArea: false,
              color: 'rgb(192, 208, 224)'
            }
          }],
          yAxes: [{
            ticks:{
              stepSize :5,
              fontSize: 8
            },
            gridLines: {
              drawOnChartArea: false,
              color: 'rgb(192, 208, 224)'
            }
          }]
        }
      },
    }
  },
  computed: {
  },
  methods: {
    layoutCreatedEvent: function (newLayout) {
      console.log('Created layout: ', newLayout)
      setInterval(() => this.createTestData(), 1000);
    },
    settingItem(type){

      if(type=="s"){
        alert("a");
      }else{
        this.dialog=true;
      }

    },
    createTestData(){
      console.log("L:")
      let x = new Date();
      let y = Math.random() * (120 - 110) + 110;
      let obj = {x:x, y: y}
      let dataset1 = this.itemList[0].data.datasets[0].data;
      if(dataset1.length>10) {
        dataset1.shift();
      }
      dataset1.push(obj);
      this.itemList[0].data={
        /*  labels: label,*/
        datasets: [
          {
            label: "data",
            backgroundColor: "transparent",
            borderColor: "rgb(26,111,168)",
            borderWidth:1,
            pointBackgroundColor: "rgb(26,111,168)",
            data: dataset1
          }
        ]
      }
      let self = this;
      this.$refs["chart0"][0].renderChart(self.itemList[0].data,self.lineChartOption,80);

    },
    addItem: function () {
      let idx = this.layout.length;
      this.layout.push({
        "x": this.layout.length * 4,
        "y": 2, //this.layout.length + (this.colNum || 12),
        "w": 4,
        "h": 2,
        "i": idx,
        "minW":4
      });
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
