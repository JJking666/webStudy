<template>
  <div class="table">
    <div class="dropDown" v-if="selectedID">
      <el-dropdown placement="bottom" @command="handleCommand">
        <i class="el-icon-arrow-down"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">选择当前页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-table
      ref="table"
      :data="tableData"
      style="width: 100%"
      header-cell-class-name="test"
      @selection-change="handleSelectionChange"
      :row-key="
        (row) => {
          return row.index;
        }
      "
    >
      <el-table-column
        align="center"
        v-if="selectedID"
        type="selection"
        width="60"
        :show-overflow-tooltip="true"
        :reserve-selection="true"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        align="center"
        v-for="(item, index) in tableColumn"
        :key="index"
        :prop="item.props"
        :label="item.label"
        :width="item.width ? item.width : ''"
      >
      </el-table-column>
      <el-table-column label="操作" align="center" width="200" v-if="hasAction">
        <template slot-scope="scope">
          <slot :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <div class="right-bottom">
      <div class="totalPageslength">共 {{ totalNum }} 条</div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalNum"
        style="margin-right: -2px"
        :page-size="pageSize"
        :current-page.sync="page1"
        @current-change="changePage"
      >
      </el-pagination>
      <span class="pageSize">
        <el-select
          :value="pageSize"
          placeholder="请选择"
          style="width: 100px"
          size="small"
          @change="changePageSize"
        >
          <el-option
            v-for="item in trNumOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalNum: Number, //数据总量
    tableData: {
      //表格数据
      type: Array,
      required: true,
      default: () => [],
    },
    tableColumn: {
      //表格头
      type: Array,
      required: true,
      default: () => [],
    },
    hasAction: {
      //是否有编辑操作
      type: Boolean,
      default: false,
    },
    selectedID: {
      //是否需要选中
      type: Array,
    },
    pageSize: Number, //分页量
    page: Number, //页数
  },
  watch: {
    page1(newV) {
      this.$emit("update:page", newV);
    },
  },
  data() {
    return {
      page1: this.page,
    };
  },
  computed: {
    trNumOptions() {
      return [10, 20, 50, 100].map((item) => {
        return { value: item, label: `${item}条/页` };
      });
    },
  },
  methods: {
    changePageSize(val) {
      this.$emit("update:pageSize", val);
    },
    changePage(val) {
      console.log("changePage");
      this.$emit("update:page", val);
    },
    handleCommand(command) {
      switch (command) {
        case "1":
          this.$refs["form"].toggleAllSelection();
        case "2":
          break;
        case "3":
          break;
      }
    },
    handleSelectionChange(val) {
      this.$emit(
        "update:selectedID",
        val.map((item) => item.id)
      );
    },
  },
};
</script>

<style lang="less" scoped>
.table {
  position: relative;
  .dropDown {
    position: absolute;
    top: 13px;
    left: 45px;
    z-index: 999;
  }
  ::v-deep .el-table__header {
    .test {
      background: #f4f4f4;
      height: 50px;
      color: black;
    }
  }

  .right-bottom {
    margin: 30px 0 25px 0;
    display: flex;
    position: relative;
    transform: translate(0, -15px);
    margin-right: 100px;

    .totalPageslength {
      width: 120%;
      display: inline-block;
      height: 32px;
      line-height: 32px;
      text-align: right;
    }

    .pageSize {
      position: absolute;
      top: 0;
      right: -100px;
    }
  }
}
</style>
