<template>
  <div style="padding: 32px 64px;">
    <h1>可编辑行</h1>

    <Table :columns="columns" :data="data" border></Table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        editIndex: -1,
        editName: '',
        editAge: '',
        editAddress: '',
        columns: [
          {
            title: '姓名',
            key: 'name',
            render: (h, { row, index }) => {
              let edit

              if (this.editIndex === index) {
                //render函数第三个参数返回节点时，必须为数组；返回文字时，可以为字符串
                edit = [h('Input', {
                  props: {
                    value: row.name
                  },
                  on: {
                    input: (val) => {
                      this.editName = val
                    }
                  }
                })]
              } else {
                edit = row.name
              }
              return h('div', [edit])
            }
          },
          {
            title: '年龄',
            key: 'age',
            render: (h, { row, index }) => {
              let edit

              if (this.editIndex === index) {
                //render函数第三个参数返回节点时，必须为数组；返回文字时，可以为字符串
                edit = [h('Input', {
                  props: {
                    value: row.age
                  },
                  on: {
                    input: (val) => {
                      this.editAge = val
                    }
                  }
                })]
              } else {
                edit = row.age
              }
              return h('div', [edit])
            }
          },
          {
            title: '地址',
            key: 'address',
            render: (h, { row, index }) => {
              let edit

              if (this.editIndex === index) {
                //render函数第三个参数返回节点时，必须为数组；返回文字时，可以为字符串
                edit = [h('Input', {
                  props: {
                    value: row.address
                  },
                  on: {
                    input: (val) => {
                      this.editAddress = val
                    }
                  }
                })]
              } else {
                edit = row.address
              }
              return h('div', [edit])
            }
          },
          {
            title: '操作',
            render: (h, { row, index }) => {
              if (this.editIndex === index) {
                return [
                  h('Button', {
                    props: {
                      type: 'success'
                    },
                    on: {
                      click: () => {
                        this.data[index].name = this.editName
                        this.data[index].age = this.editAge
                        this.data[index].address = this.editAddress
                        this.editIndex = -1
                      }
                    }
                  }, '保存'),

                  h('Button', {
                    props: {
                      type: 'error'
                    },
                    style: {
                      marginLeft: '6px'
                    },
                    on: {
                      click: () => {
                        this.editIndex = -1
                      }
                    }
                  }, '取消')
                ]
              } else {
                return h('Button', {
                  on: {
                    click: () => {
                      this.editName = row.name
                      this.editAge = row.age
                      this.editAddress = row.address
                      this.editIndex = index
                    }
                  }
                }, '修改')
              }
            }
          }
        ],
        data: [
          {
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park'
            },
            {
              name: 'Jim Green',
              age: 24,
              address: 'London No. 1 Lake Park'
            },
            {
              name: 'Joe Black',
              age: 30,
              address: 'Sydney No. 1 Lake Park'
            },
            {
              name: 'Jon Snow',
              age: 26,
              address: 'Ottawa No. 2 Lake Park'
            }
        ]
      }
    }
  }
</script>

<style>

</style>
