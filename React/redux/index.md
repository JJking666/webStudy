## Redux

> action 和 state 中的值注意点

Redux action 和 state 应该只能包含普通的 JS 值，如对象、数组和基本类型。不要将类实例、函数或其他不可序列化的值放入 Redux！

> createSlice 切片 类似 vuex 的模块

```ts
const initialState = {
  post: {
    id: 200,
    content: "cy",
    title: "mch",
  },
};

const postsSlice = createSlice({
  name: "posts", //切片名 作为action的前缀 posts/postAdded
  initialState, //state数据
  reducers: {
    //看作action
    postAdded(state, action) {
      state.push(action.payload); //action.payload是传入的参数
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
});

export const { postAdded, postUpdated } = postsSlice.actions; //暴露方法

export default postsSlice.reducer; //暴露模块
```

> 获取在 redux 中的数据`useSelector`

```ts
import { useSelector, getState } from "react-redux"; //引入查找数据函数
const post = useSelector(
  (
    state //state代表redux的state
  ) => state.posts.find((post) => post.id === postId) //返回state中的post的id属性是否等于postId
);
const data = useSelector(
  (
    state //state代表redux的state
  ) => state.data //返回state中的data
);
const allData = getState(); //获取state所有数据
```

注意每当 `useSelector` 返回的值为新引用时，组件就会重新渲染。所以组件应始终尝试从 `store` 中选择它们需要的尽可能少的数据，这将有助于确保它仅在实际需要时才渲染

```ts
//或者直接在postsSlice中定义自定义的useSelector并导出使用
const postsSlice = createSlice({...})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts

export const selectPostById = (state, postId) =>
  state.posts.find(post => post.id === postId)

//使用
import { selectAllPosts } from './postsSlice'

export const PostsList = () => {
  const posts = useSelector(selectAllPosts)
}
```

```ts
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { postUpdated } from "./postsSlice";

export const EditPostForm = ({ match }) => {
  const { postId } = match.params; // match.params 获取路由中的所有参数

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useDispatch();
  const history = useHistory();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content })); //提交方法
      history.push(`/posts/${postId}`); //跳转路由并附带参数postId
    }
  };

  return (
    <section>
      <h2>编辑帖子</h2>
      <form>
        <label htmlFor="postTitle">帖子标题：</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">内容：</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        保存帖子

      </button>
    </section>
  );
};
```

> prepare 函数

- 对传入数据预先处理
- createSlice 允许我们在编写 reducer 时定义一个 prepare 函数。
- prepare 函数可以接受多个参数，生成诸如唯一 ID 之类的随机值，并运行需要的任何其他同步逻辑来决定哪些值进入 action 对象。
- 然后它应该返回一个包含 payload 字段的对象。

```ts
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId, //绑定用户id
            date: new Date().toISOString(),
          },
        };
      },
    },
    // other reducers here
  },
});

相当于

postAdded(state, action) {
    //prepare
    action.payload = {
        id: nanoid(),
            title,
            content,
            userId, //绑定用户id
            date: new Date().toISOString(),
    }
    //reducer
    state.push(action.payload);
}
```

> 创建 usersSlice 新切片

```ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Tianna Jenkins" },
  { id: "1", name: "Kevin Grant" },
  { id: "2", name: "Madison Price" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
```

> 将多个切片添加到 store 中

```ts
import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});
```

> createAsyncThunk 请求数据

createAsyncThunk 接收 2 个参数:

- 将用作生成的 action 类型的前缀的字符串
- 一个“payload creator”回调函数，它应该返回一个包含一些数据的 Promise，或者一个被拒绝的带有错误的 Promise

```ts
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts");
  return response.posts;
});
```

> createAsyncThunk

有时切片的 reducer 需要响应 没有 定义到该切片的 reducers 字段中的 action。这个时候就需要使用 slice 中的 extraReducers 字段

createAsyncThunk 返回的所有 3 种 action，都可以通过返回的 Promise 来处理。

- 当请求开始时，我们将 status 枚举设置为 'loading'
- 如果请求成功，我们将 status 标记为 'succeeded'，并将获取的帖子添加到 state.posts
- 如果请求失败，我们会将 status 标记为 'failed'，并将错误消息保存到 state 中，需要的时候可以显示出来

```ts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts");
  return response.posts;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // omit existing reducers here
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
      state.posts = state.posts.concat(action.payload);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});
```

> unwrapResult

createAsyncThunk 在内部处理了所有错误，因此我们在日志中看不到任何关于“rejected Promises”的消息。然后它返回它 dispatch 的最终 action：如果成功则返回“已完成” action，如果失败则返回“拒绝” action。
Redux Toolkit 有一个名为 unwrapResult 的工具函数，它将返回来自 fulfilled action 的 action.payload 数据，或者如果它是 rejected action 则抛出错误
因此，如果成功创建，则正常进行，如果失败，则将错误记录到控制台。

```ts
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { addNewPost } from "./postsSlice";

export const AddPostForm = () => {
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        const resultAction = await dispatch(
          addNewPost({ title, content, user: userId })
        );
        unwrapResult(resultAction);
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };
};
```
