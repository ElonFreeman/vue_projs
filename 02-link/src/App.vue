<script setup>
import { ref } from 'vue'

// 计数器放在 App.vue 里 —— 也就是 <router-view> 外面。
// 这样切换页面时它不会被销毁，才能真正用来对比「路由切换」和「整页刷新」。
const clicks = ref(0)
</script>

<template>
  <header class="bar">
    <span class="badge">第 2 关</span>
    <strong>用链接跳转</strong>
    <a class="back" href="/">关卡地图</a>
  </header>

  <main class="wrap">
    <!-- 导航区：router-link 渲染出来也是 <a>，但点击时不会刷新整页 -->
    <nav class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
      <router-link to="/students">学生</router-link>
    </nav>

    <div class="row" style="margin-bottom: 16px">
      <button class="btn" type="button" @click="clicks++">计数 +1（当前 {{ clicks }}）</button>
      <span class="muted">切页面它不会归零，整页刷新才会</span>
    </div>

    <router-view />

    <section class="note">
      <h2>本步新增</h2>
      <ul>
        <li><code>&lt;router-link to="/about"&gt;</code>：站内链接，只换组件不刷新页面</li>
        <li><code>useRouter().push('/about')</code>：在代码里跳转</li>
        <li>当前所在的那一项会自动带上 <code>router-link-active</code> 类</li>
      </ul>
      <p class="muted">下一步：让同一个页面显示不同用户 —— <code>/users/1</code>、<code>/users/2</code>。</p>
    </section>
  </main>
</template>
