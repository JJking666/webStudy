<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2023-01-17 22:46:13
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2023-01-17 23:42:21
 * @FilePath: \webStudy\hook\index.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

### 对弹窗进行封装

```js
import { ElMessage, MessageOptions } from "element-plus";

export function message(message: string, option?: MessageOptions) {
  ElMessage({ message, ...option });
}
export function warningMessage(message: string, option?: MessageOptions) {
  ElMessage({ message, ...option, type: "warning" });
}
export function errorMessage(message: string, option?: MessageOptions) {
  ElMessage({ message, ...option, type: "error" });
}
export function infoMessage(message: string, option?: MessageOptions) {
  ElMessage({ message, ...option, type: "info" });
}
```

### 表格获取数据(分页，加载数据，状态改变)

```js
export interface MessageType {
  GET_DATA_IF_FAILED?: string;
  GET_DATA_IF_SUCCEED?: string;
  EXPORT_DATA_IF_FAILED?: string;
  EXPORT_DATA_IF_SUCCEED?: string;
}
export interface OptionsType {
  requestError?: () => void;
  requestSuccess?: () => void;
  message: MessageType;
}

const DEFAULT_MESSAGE = {
  GET_DATA_IF_FAILED: "获取列表数据失败",
  EXPORT_DATA_IF_FAILED: "导出数据失败",
};

const DEFAULT_OPTIONS: OptionsType = {
  message: DEFAULT_MESSAGE,
};

export default function useList<
  ItemType extends Object,
  FilterOption extends Object
>(
  listRequestFn: Function,  //获取数据函数
  filterOption: Ref<Object>,    //筛选项数据
  exportRequestFn?: Function,   // 导出函数
  options? :DEFAULT_OPTIONS // 用于函数成功、失败时执行指定钩子函数与输出消息内容。
) {
  // 加载态
  const loading = ref(false);
  // 当前页
  const curPage = ref(1);
  // 总数量
  const total = ref(0);
  // 分页大小
  const pageSize = ref(10);
  // 表格数据
  const list = ref<ItemType[]>([]);

   watch([curPage, pageSize], () => {
    loadData(curPage.value);
  });

  // 过滤数据
  // 获取列表数据
  // filterOption代表筛选项数据 注意，这里 filterOption 参数类型需要的是 ref 类型，否则会丢失响应式 无法正常工作
  const loadData = async (page = curPage.value) => {
  loading.value = true;
  try {
    const {
      data,
      meta: { total: count },
    } = await listRequestFn(pageSize.value, page, filterOption.value);
    list.value = data;
    total.value = count;
    // 执行成功钩子
    options?.message?.GET_DATA_IF_SUCCEED &&
      message(options.message.GET_DATA_IF_SUCCEED);
    options?.requestSuccess?.();
      } catch (error) {
          options?.message?.GET_DATA_IF_FAILED &&
          errorMessage(options.message.GET_DATA_IF_FAILED);
          // 执行失败钩子
          options?.requestError?.();
      } finally {
          loading.value = false;
      }
  };
  // 清空筛选器
  const reset = () => {
    if (!filterOption.value) return;
    const keys = Reflect.ownKeys(filterOption.value);
    filterOption.value = {} as FilterOption;
    keys.forEach((key) => {
      Reflect.set(filterOption.value!, key, undefined);
    });
    loadData();
  };
    // 导出
  const exportFile = async () => {
  if (!exportRequestFn) {
    throw new Error("当前没有提供exportRequestFn函数");
  }
  if (typeof exportRequestFn !== "function") {
    throw new Error("exportRequestFn必须是一个函数");
  }
  try {
    const {
      data: { link },
    } = await exportRequestFn(filterOption.value);
    window.open(link);
    // 显示信息
    options?.message?.EXPORT_DATA_IF_SUCCEED &&
      message(options.message.EXPORT_DATA_IF_SUCCEED);
    // 执行成功钩子
    options?.exportSuccess?.();
    } catch (error) {
        // 显示信息
        options?.message?.EXPORT_DATA_IF_FAILED &&
        errorMessage(options.message.EXPORT_DATA_IF_FAILED);
        // 执行失败钩子
        options?.exportError?.();
    }
  };
  return {
    loading,
    curPage,
    total,
    pageSize,
    list,
    loadData
  }
}

```

vue 中使用

```vue
<script setup lang="ts">
import { UserInfoApi } from "@/network/api/User";
import useList from "@/lib/hooks/useList/index";
const filterOption = ref<UserInfoApi.FilterOptionType>({});
const {
  list,
  loading,
  reset,
  filter,
  curPage,
  pageSize,
  reload,
  total,
  loadData,
} = useList<UserInfoApi.UserInfo[], UserInfoApi.FilterOptionType>(
  UserInfoApi.list,
  filterOption
);
</script>
```
