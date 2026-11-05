<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="card">
    <h1>首页</h1>
    <p class="lead">
      先点上面的「计数 +1」几下，再用下面三种方式去「关于」页，然后回来看看数字还在不在。
    </p>

    <div class="row">
      <router-link class="btn btn--primary" to="/about">router-link 跳转</router-link>
      <a class="btn" href="/about">普通 a 标签跳转</a>
      <button class="btn" type="button" @click="router.push('/about')">代码里 push</button>
    </div>

    <p class="muted" style="margin-top: 14px">
      走 <code>router-link</code> 或 <code>push</code> 回来后，计数还在；<br />
      走 <code>&lt;a href&gt;</code> 回来后会变成 0 —— 它让浏览器重新加载了整个页面，
      Vue 应用被销毁重建，状态自然就没了。
    </p>

    <pre class="code"><span class="c">&lt;!-- 站内跳转：只换组件 --&gt;</span>
&lt;router-link to="/about"&gt;关于&lt;/router-link&gt;

<span class="c">&lt;!-- 整页刷新：别用在站内 --&gt;</span>
&lt;a href="/about"&gt;关于&lt;/a&gt;</pre>
  </div>
</template>
