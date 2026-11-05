<template>
  <div class="card">
    <h1>关于</h1>
    <p class="lead">页面切换时，浏览器地址变了，但页面没有重新加载。</p>

    <p class="muted">
      打开浏览器开发者工具的 Network 面板，再点一次「首页」：
      走 <code>router-link</code> 只会请求一个很小的模块，走 <code>&lt;a&gt;</code> 会重新请求整份 HTML。
    </p>

    <p class="muted" style="margin-top: 10px">
      另外，router-link 渲染出来仍然是 <code>&lt;a href="/about"&gt;</code>，
      所以右键「在新标签页打开」依然是正常的——这点比用 click 事件手写跳转要好。
    </p>
  </div>
</template>
