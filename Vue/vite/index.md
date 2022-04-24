## vite
> 安装
```cmd
安装 $ npm init vite@latest
```
> 创建模板
```ts
# npm 6.x
npm init vite@latest my-vue-app --template vue

# npm 7+, 需要额外的双横线：
npm init vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app -- --template vue
```

>在一个 Vite 项目中，index.html 在项目最外层而不是在 public 文件夹内。这是有意而为之的：在开发期间 Vite 是一个服务器，而 index.html 是该 Vite 项目的入口文件。

> 命令行界面
```ts
{
  "scripts": {
    "dev": "vite", // 启动开发服务器，别名：`vite dev`，`vite serve`
    "build": "vite build", // 为生产环境构建产物
    "preview": "vite preview" // 本地预览生产构建产物
  }
}
```

> 使用插件
若要使用一个插件，需要将它添加到项目的 devDependencies 并在 vite.config.js 配置文件中的 plugins 数组中引入它。
```ts
// vite.config.js
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
})
```

> 强制插件排序
+ pre：在 Vite 核心插件之前调用该插件
+ 默认：在 Vite 核心插件之后调用该插件
+ post：在 Vite 构建插件之后调用该插件
```ts
export default defineConfig({
  plugins: [
    {
      ...image(),
      enforce: 'pre'
    }
  ]
})
```

> 按需应用

使用 apply 属性指明它们仅在 'build' 或 'serve' 模式时调用
```ts
export default defineConfig({
  plugins: [
    {
      ...typescript2(),
      apply: 'build'
    }
  ]
})
```