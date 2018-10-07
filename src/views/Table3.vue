<template>
   <div style="padding: 32px 64px;">
    <h1>前端分页并排序,过滤</h1>

    <Table 
      :data="dataWithPage"
      :columns="columns" 
      :loading="loading" 
      border 
      size="small"
      @on-sort-change="handleSortChange"
      @on-filter-change="handleFilterChange">
    </Table>

    <div  style="text-align: center; margin: 16px 0;">
      <Page :total="limitData.length" :current.sync="current"></Page>
    </div>
  </div>
</template>

<script>
  import $ from '../libs/utils'

  export default {
    data () {
      return {
        total: 0,
        current: 1,
        loading: false,
        sortType: 'normal', //正常，升序，降序
        filterType: undefined,
        columns: [
          {
            title: '号码',
            key: 'number',
            sortable: 'custom'
          },
          {
            title: '等级',
            key: 'status',
            render: (h, { row }) => {
              if (row.status === 1) {
                return h('Tag', {
                  props:{
                    color: 'green'
                  }
                }, '等级1') 
              } else if (row.status === 2) {
                return h('Tag', {
                  props:{
                    color: 'red'
                  }
                }, '等级2') 
              }
            },
            filters: [
              {
                label: '级别1',
                value: 1
              },
              {
                label: '级别2',
                value: 2
              }
            ],
            filterMultiple: false,
            filterMethod (value, row) {
              if (value === 1) {
                return row.status === 1
              } else if (value === 2) {
                return row.status === 2
              }
            },
            filterRemote (value) {
              // console.log(value)
              this.filterType = value[0]
            }
          }
        ],
        data: []
      }
    },
    computed: {
      //limitData即前端进行排序和过滤之后的数据
      limitData () {
        let data = [...this.data] //不破坏原数据

        if (this.sortType === 'asc') {
          data = data.sort((a, b) => {
            return a.number > b.number ? 1 : -1  //增加判断1或-1，提升兼容性
          })
        }
        if (this.sortType === 'desc') {
          data = data.sort((a, b) => {
            return a.number < b.number ? 1 : -1  //增加判断1或-1，提升兼容性
          })
        }
        if (this.filterType === 1) {
          data = data.filter(item => {
            return item.status === 1
          })
        }
        if (this.filterType === 2) {
          data = data.filter(item => {
            return item.status === 2
          })
        }

        return data
      },
      //对limitData进行分页
      dataWithPage () {
        const data = this.limitData
        const start = this.current * 10 - 10
        const end = start + 10

        return [...data].slice(start, end)
      }
    },
    methods: {
      handleSortChange ({ columns, key, order }) {
        this.sortType = order
        this.current = 1
      },
      handleFilterChange () {
        this.current = 1
      },
      getData () {
        if (this.loading) return

        this.loading = true

        $.ajax({
          method: 'get',
          url: `/data/list`
        }).then(res => {
          setTimeout(() => {
            this.data = res.data.data.list
            this.total = res.data.data.total
            this.loading = false
          }, 1000);
        })
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>

<style>

</style>
