	Vue.use(iview);
	Vue.component('my-component',{
		template:'<Select @on-change="say"  v-model="model1" size="small" style="width:100px">\
        <Option v-for="item in cityList" :value="item.value" :key="item.value" >{{\ item.label }}</Option>\
    </Select>',
      data () {
            return {
                cityList: [
                    {
                        value: 'New York_taxi',
                        label: 'New York_taxi'
                    },
                    {
                        value: 'Changchun_phone',
                        label: 'Changchun_phone'
                    }
                ],
                model1: ''
            }
        },
        methods: {
		   say: function () {
		      console.log(this.model1)
		   }
		}
	});
	Vue.component('my-component_li',{
		template:'<Select @on-change="say"  v-model="model1" size="small" style="width:70px">\
        <Option v-for="item in cityList" :value="item.value" :key="item.value" >{{\ item.label }}</Option>\
    </Select>',
      data () {
            return {
                cityList: [
                    {
                        value: '0',
                        label: 'district'
                    },
                    {
                        value: '1',
                        label: 'grid'
                    }
                ],
                model1: ''
            }
        },
        methods: {
		   say: function () {
		      console.log(this.model1)
              lidu=this.model1;
		   }
		}
	});

	Vue.component('my-component_history_date',{
		template:'<DatePicker size="small" :value="value2" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 180px"></DatePicker>',
      data () {
            return {
                value2: ['2016-01-02', '2016-10-21']
            }
        },
        methods: {
		   say: function () {
		      console.log(this.model1)
		   }
		}
	});
		Vue.component('my-component_new_date',{
		template:'<DatePicker size="small" :value="value2" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 180px"></DatePicker>',
      data () {
            return {
                value2: ['2016-10-22', '2016-10-28']
            }
        },
        methods: {
		   say: function () {
		      console.log(this.model1)
		   }
		}
	});


	var app=new Vue({
		el:'#Title',
        methods: {
           show: function () {
                treee(shunxu);
                draw_sandian();
                map_jiance();
                time_yichang();
           }
        }
	});

    Vue.component('my-tab_2',{
        template:'<Tabs type="card" size="small" v-model="model1"  @on-click="say" value="name1">\
        <TabPane label="history" name="0"></TabPane>\
        <TabPane label="new" name="1"></TabPane>\
        <TabPane label="diffience" name="2"></TabPane>\
    </Tabs>',
        data () {
            return {
                model1: ''
            }
        },
        methods: {
           say: function () {
              num_map=this.model1;
              map_phone();
           }
        }
    });
    
    new Vue({
        el:'#Down-Horizontal2-vertikal1'
    });

    Vue.component('my-tab_3',{
    template:'<Tabs type="card" size="small" v-model="model1"  @on-click="say" value="name1">\
    <TabPane label="history/new" name="0"></TabPane>\
</Tabs>',
    data () {
        return {
            model1: ''
        }
    },
    methods: {
       say: function () {
          num_time=this.model1;
          time_phone();
       }
    }
});
    
    new Vue({
        el:'#Down-Horizontal3-vertikal1'
    });



    Vue.component('my-tab_4',{
    template:'<Tabs type="card" size="small" v-model="model1"  @on-click="say" value="name1">\
    <TabPane label="history" name="0"></TabPane>\
    <TabPane label="new" name="1"></TabPane>\
    <TabPane label="diffience" name="2"></TabPane>\
</Tabs>',
    data () {
        return {
            model1: ''
        }
    },
    methods: {
       say: function () {
          num_time=this.model1;
          time_phone();
       }
    }
});
    
    new Vue({
        el:'#Down-Horizontal4-vertikal1'
    });




    Vue.component('my-tab_shu',{
    template:'<Tabs type="card" size="small" v-model="model1"  @on-click="say" value="name1" >\
    <TabPane label="history" name="0"></TabPane>\
    <TabPane label="new" name="1"></TabPane>\
    <TabPane label="diffience" name="2"></TabPane>\
    <Icon type="md-arrow-back" size="30" slot="extra"  @click="back"/>\
</Tabs>',
    data () {
        return {
            model1: ''
        }
    },
    methods: {
       say: function () {
          num_tree=this.model1;
          treee(shunxu);
       },
       back: function () {
        shunxu--;
        treee(shunxu);
       }
    }
});
    
    new Vue({
        el:'#Top-Horizontal0-vertikal1'
    });


