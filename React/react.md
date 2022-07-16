> react setState 是异步的

```ts
// 连续触发2次setObj（实际项目不会这样写，我这样写只是为了模拟连续触发2次setObj带来的问题）
setObj({ ...obj, a: 2 });
setObj({ ...obj, b: 3 });
//{a: 1, b: 3}
```

```ts
setObj({ ...obj, a: 2 });
// data标识存储的是更新a后的对象，用这样的方式可以解决连续触发2次带来的问题
setObj((data) => ({ ...data, b: 3 }));
//{a: 2, b: 3}
```

或者

```ts
obj = { a: 2, b: 3 };
setXxx(y); //触发render刷新
```

> react 子组件 props 修改触发重新渲染踩坑

```ts
useEffect(() => {
  console.log(res);
}, [props.res]); //注意要加上props！
```

> 跳转路由获取参数

```ts
import { useHistory } from "react-router-dom";
const history = useHistory();

export const demo = ({ match }) => {
  const { postId } = match.params; // match.params 获取路由中的所有参数
  history.push(`/posts/${postId}`); //跳转路由并附带参数postId
};
或者;
import { Link } from "react-router-dom";
<Link to={`/editPost/${post.id}`} className="button">
  Edit Post
</Link>;
```

> React.lazy

React.lazy 函数能让你像渲染常规组件一样处理动态引入（的组件）。

```ts
//使用之前：
import OtherComponent from "./OtherComponent";

//使用之后：
const OtherComponent = React.lazy(() => import("./OtherComponent"));
```

此代码将会在组件首次渲染时，自动导入包含 OtherComponent 组件的包。

React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 defalut export 的 React 组件

然后应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级

```ts
import React, { Suspense } from "react";

const OtherComponent = React.lazy(() => import("./OtherComponent"));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

fallback 属性接受任何在组件加载过程中你想展示的 React 元素。你可以将 Suspense 组件置于懒加载组件之上的任何位置。你甚至可以用一个 Suspense 组件包裹多个懒加载组件。

```ts
import React, { Suspense } from "react";

const OtherComponent = React.lazy(() => import("./OtherComponent"));
const AnotherComponent = React.lazy(() => import("./AnotherComponent"));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

React.lazy 目前只支持默认导出（default exports）。如果你想被引入的模块使用命名导出（named exports），你可以创建一个中间模块，来重新导出为默认模块。这能保证 tree shaking 不会出错，并且不必引入不需要的组件。

```ts
export default const MyComponent = /* ... */;
const MyComponent = lazy(() => import("./MyComponent.js"));
或
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;
// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```

### context

> Context.Provider

```ts
<MyContext.Provider value={传入传递的值}>
```

每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。

即

> Class.contextType

挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。这能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。

即给组件赋值一个 context 对象

```ts
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* 在组件挂载完成后，使用 MyContext 组件的值来执行一些有副作用的操作 */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* 基于 MyContext 组件的值进行渲染 */
  }
}
MyClass.contextType = MyContext;
```

> Context.Consumer

这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 value 值等同于往上组件树离这个 context 最近的 Provider 提供的 value 值。如果没有对应的 Provider，value 参数等同于传递给 createContext() 的 defaultValue。

即在外部(父)使用 context.provider,内部()使用 context.consumer

```ts
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

> 消费多个 Context

为了确保 context 快速进行重渲染，React 需要使每一个 consumers 组件的 context 在组件树中成为一个单独的节点。

```ts
// Theme context，默认的 theme 是 “light” 值
const ThemeContext = React.createContext("light");

// 用户登录 context
const UserContext = React.createContext({
  name: "Guest",
});

class App extends React.Component {
  render() {
    const { signedInUser, theme } = this.props;

    // 提供初始 context 值的 App 组件
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

// 一个组件可能会消费多个 context
function Content() {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <UserContext.Consumer>
          {(user) => <ProfilePage user={user} theme={theme} />}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```

> context 注意点

因为 context 会使用参考标识（reference identity）来决定何时进行渲染，这里可能会有一些陷阱，当 provider 的父组件进行重渲染时，可能会在 consumers 组件中触发意外的渲染。举个例子，当每一次 Provider 重渲染时，以下的代码会重渲染所有下面的 consumers 组件，因为 value 属性总是被赋值为新的对象

即赋值为新对象会引起 consumers 组件的重渲染，应设置为组件属性

```ts
class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{ something: "something" }}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
```

```ts
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: { something: "something" },
    };
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}
```

> ref

```ts
function demo(props) {
  const ref = React.createRef();

  useEffect()

  // 我们导入的 FancyButton 组件是高阶组件（HOC）LogProps。
  // 尽管渲染结果将是一样的，
  // 但我们的 ref 将指向 LogProps 而不是内部的 FancyButton 组件！
  // 这意味着我们不能调用例如 ref.current.focus() 这样的方法
  render (
    <FancyButton label="Click Me" handleClick={handleClick} ref={ref} />;
  )
}
```

> forwordRef

Ref 转发是一个可选特性，其允许某些组件接收 ref，并将其向下传递（换句话说，“转发”它）给子组件。

```ts
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

- 我们通过调用 React.createRef 创建了一个 React ref 并将其赋值给 ref 变量。
- 我们通过指定 ref 为 JSX 属性，将其向下传递给 <FancyButton ref={ref}>。
- React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数。
- 我们向下转发该 ref 参数到 <button ref={ref}>，将其指定为 JSX 属性。
- 当 ref 挂载完成，ref.current 将指向 <button> DOM 节点。

**_注意_**

```js
第二个参数 ref 只在使用 `React.forwardRef` 定义组件时存在。常规函数和 `class` 组件不接收 `ref` 参数，且 `props` 中也不存在 `ref`。

`Ref` 转发不仅限于 `DOM` 组件，你也可以转发 `refs` 到 `class` 组件实例中。
```

> 在高阶组件中转发 refs

这个技巧对高阶组件（也被称为 HOC）特别有用。让我们从一个输出组件 props 到控制台的 HOC 示例开始：

```ts
function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log("old props:", prevProps);
      console.log("new props:", this.props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return LogProps;
}
```

```ts
class FancyButton extends React.Component {
  focus() {
    // ...
  }
}

// 我们导出 LogProps，而不是 FancyButton。
// 虽然它也会渲染一个 FancyButton。

export default logProps(FancyButton);
```

```ts
import FancyButton from "./FancyButton";

const ref = React.createRef();

// 我们导入的 FancyButton 组件是高阶组件（HOC）LogProps。
// 尽管渲染结果将是一样的，
// 但我们的 ref 将指向 LogProps 而不是内部的 FancyButton 组件！
// 这意味着我们不能调用例如 ref.current.focus() 这样的方法
<FancyButton label="Click Me" handleClick={handleClick} ref={ref} />;
```

我们可以使用 React.forwardRef API 明确地将 refs 转发到内部的 FancyButton 组件。React.forwardRef 接受一个渲染函数，其接收 props 和 ref 参数并返回一个 React 节点。例如：

```ts
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log("old props:", prevProps);
      console.log("new props:", this.props);
    }

    render() {
      const { forwardedRef, ...rest } = this.props;

      // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // 注意 React.forwardRef 回调的第二个参数 “ref”。
  // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
  // 然后它就可以被挂载到被 LogProps 包裹的子组件上。
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
```

> Fragments

React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。

```ts
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

或者使用短语法

```ts
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}
```

一种常见使用 Fragment 的模式是组件返回一个子元素列表。以此 React 代码片段为例：

```ts
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
```

`<Columns />` 需要返回多个 `<td>` 元素以使渲染的 HTML 有效。如果在 `<Columns />` 的 `render()` 中使用了父 div，则生成的 HTML 将无效。

```ts
class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}
```

得到无效 html

而使用 Fragment

```ts
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

这样可以正确的输出 `<Table />`：

```ts
<table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>
```

注意使用显式 <React.Fragment> 语法声明的片段可能具有 key

```ts
function Glossary(props) {
  return (
    <dl>
      {props.items.map((item) => (
        // 没有`key`，React 会发出一个关键警告
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

> 高阶组件

高阶组件是参数为组件，返回值为新组件的函数。

```ts
const CommentListWithSubscription = withSubscription(
  CommentList, //组件
  (DataSource) => DataSource.getComments() //数据
);
```

```ts
// 此函数接收一个组件...
function withSubscription(WrappedComponent, selectData) {
  // ...并返回另一个组件...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props),
      };
    }

    componentDidMount() {
      // ...负责订阅相关的操作...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props),
      });
    }

    render() {
      // ... 并使用新数据渲染被包装的组件!
      // 请注意，我们可能还会传递其他属性
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

被包装组件接收来自容器组件的所有 prop，同时也接收一个新的用于 render 的 data prop。HOC 不需要关心数据的使用方式或原因，而被包装组件也不需要关心数据是怎么来的。

与组件一样，withSubscription 和包装组件之间的契约完全基于之间传递的 props。这种依赖方式使得替换 HOC 变得容易，只要它们为包装的组件提供相同的 prop 即可。

> 不要改变原始组件,使用组合。

不要试图在 HOC 中修改组件原型（或以其他方式改变它）。

```ts
function logProps(InputComponent) {
  InputComponent.prototype.componentDidUpdate = function (prevProps) {
    console.log("Current props: ", this.props);
    console.log("Previous props: ", prevProps);
  };
  // 返回原始的 input 组件，暗示它已经被修改。
  // 每次调用 logProps 时，增强组件都会有 log 输出。

  return InputComponent;
}
const EnhancedComponent = logProps(InputComponent);
```

这样做会产生一些不良后果。其一是输入组件再也无法像 HOC 增强之前那样使用了。更严重的是，如果你再用另一个同样会修改 componentDidUpdate 的 HOC 增强它，那么前面的 HOC 就会失效！同时，这个 HOC 也无法应用于没有生命周期的函数组件。

修改传入组件的 HOC 是一种糟糕的抽象方式。调用者必须知道他们是如何实现的，以避免与其他 HOC 发生冲突。

HOC 不应该修改传入组件，而应该使用组合的方式，通过将组件包装在容器组件中实现功能：

```ts
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log("Current props: ", this.props);
      console.log("Previous props: ", prevProps);
    }
    render() {
      // 将 input 组件包装在容器中，而不对其进行修改。Good!
      return <WrappedComponent {...this.props} />;
    }
  };
}
```

该 HOC 与上文中修改传入组件的 HOC 功能相同，同时避免了出现冲突的情况。它同样适用于 class 组件和函数组件。而且因为它是一个纯函数，它可以与其他 HOC 组合，甚至可以与其自身组合。

> 产生跨域的本质是ajax引擎,解决跨域

+ 在package文件中配置proxy,然后让请求地址指向自身地址

```ts
//package.json
proxy:"http://localhost:5000"   //自身是3000,代理到5000端口
//app.js
axios.get("http://localhost:3000")      //发送到端口3000但是会被代理到5000的中间服务器，然后中间服务器和真正服务器进行请求接收
```
此时会变成5000端口的中间服务器发送请求，5000端口的服务器接收请求并返回
注意如果本地有请求的文件，那么会找本地要，如果没有再向服务器要

React中
```ts
const {createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
      createProxyMiddleware ('/api1', {
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: {'^/api1': ''}
    })
  )
};
```

+ 在文件或者webpack中写入proxy

```ts
proxy:('/api1',{
    target:"http://localhost:5000",
    changeOrigin:true,      //修改请求头的host字段，修改为代理的5000端口，默认不修改
    pathRewrite:('^/api1':'')   //必须注意是否重写,否则可能找不到资源(路径有问题)
})
```
当前缀匹配有api1时,代理到为端口5000的服务器,并把路径重写(去掉/api1)
如果请求多个服务器，则以相同格式添加proxy