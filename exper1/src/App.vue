<template>
  <div class="product-page">
    <div class="content-wrapper">
      <div class="page-header">
        <h1>商品管理</h1>
        <p class="subtitle">轻松管理您的商品库存</p>
      </div>

      <div class="toolbar">
        <div class="filter-group">
          <label class="filter-label">筛选分类</label>
          <select v-model="classify" class="filter-select">
            <option disabled value="选择商品分类">选择商品分类</option>
            <option v-for="item in classifyList" :value="item" :key="item">{{ item }}</option>
          </select>
        </div>
        <button class="btn-add" @click="show">
          <span class="btn-icon">+</span>
          新增商品
        </button>
      </div>

      <div class="table-wrapper">
        <table class="product-table">
          <thead>
            <tr>
              <th style="width: 18%;">类别</th>
              <th style="width: 32%;">商品名称</th>
              <th style="width: 25%;">商品价格</th>
              <th style="width: 25%;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in productList" :key="index">
              <td>
                <span class="tag">{{ item.classify }}</span>
              </td>
              <td class="name-cell">{{ item.productName }}</td>
              <td class="price-cell">
                <span class="currency">¥</span>
                <span class="amount">{{ item.productPrice }}</span>
              </td>
              <td>
                <button class="btn-delete" @click="deletes(index)">删除</button>
              </td>
            </tr>
            <tr v-if="productList.length === 0">
              <td colspan="4" class="empty-cell">
                <div class="empty-icon">📦</div>
                <p>暂无商品，点击上方按钮添加</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 模态框 -->
    <transition name="fade">
      <div v-if="flag === 'block'" class="overlay">
        <div class="dialog">
          <div class="dialog-header">
            <h2>新增商品</h2>
            <button class="dialog-close" @click="close">×</button>
          </div>
          <div class="dialog-body">
            <div class="form-field">
              <label>商品类别</label>
              <input type="text" readonly v-model="addPro.classify" class="field-readonly" />
            </div>
            <div class="form-field">
              <label>商品名称</label>
              <input
                type="text"
                v-model="addPro.productName"
                placeholder="请输入商品名称"
              />
            </div>
            <div class="form-field">
              <label>商品价格</label>
              <input
                type="number"
                v-model="addPro.productPrice"
                placeholder="请输入商品价格"
                min="0"
              />
            </div>
          </div>
          <div class="dialog-footer">
            <button class="btn-cancel" @click="close">取消</button>
            <button class="btn-confirm" @click="submitMessage">确认添加</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  name: 'ProductPage',
  setup() {
    const flag = ref('none');
    const classify = ref('蔬菜');
    const classifyList = ref(['蔬菜', '水果', '粮油', '水产品', '食用菌']);

    const addPro = reactive({
      classify: '',
      productName: '',
      productPrice: '',
    });

    const productList = ref([
      { classify: '蔬菜', productName: '甘蓝', productPrice: 2.3 },
      { classify: '水果', productName: '苹果', productPrice: 2.3 },
      { classify: '粮油', productName: '大米', productPrice: 2.3 },
      { classify: '水产品', productName: '犹豫', productPrice: 2.3 },
      { classify: '食用菌', productName: '香菇', productPrice: 2.3 },
      { classify: '食用菌', productName: '平菇', productPrice: 2.3 },
    ]);

    const show = () => {
      addPro.classify = classify.value;
      addPro.productName = '';
      addPro.productPrice = '';
      flag.value = 'block';
    };

    const close = () => {
      flag.value = 'none';
    };

    const submitMessage = () => {
      if (!addPro.productName || !addPro.productPrice) {
        alert('请填写商品名称和价格');
        return;
      }
      productList.value.push({
        classify: addPro.classify,
        productName: addPro.productName,
        productPrice: addPro.productPrice,
      });
      flag.value = 'none';
      addPro.productName = '';
      addPro.productPrice = '';
    };

    const deletes = (index) => {
      productList.value.splice(index, 1);
    };

    return {
      flag,
      classify,
      classifyList,
      addPro,
      productList,
      show,
      close,
      submitMessage,
      deletes,
    };
  },
});
</script>

<style scoped>
/* 全局重置 */
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

/* 页面容器：背景填满窗口 + Flex 居中 */
.product-page {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  box-sizing: border-box;
  overflow: auto;
  padding: 24px;
}

/* 内容包裹层：限制最大宽度并居中 */
.content-wrapper {
  width: 100%;
  max-width: 1100px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}

.page-header {
  text-align: center;
  margin-bottom: 20px;
  flex-shrink: 0;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 8px;
  letter-spacing: 1px;
}

.subtitle {
  font-size: 14px;
  color: #8896a6;
  margin: 0;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
  flex-shrink: 0;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-label {
  font-size: 14px;
  color: #5a6b7c;
  font-weight: 500;
}

.filter-select {
  padding: 10px 36px 10px 14px;
  font-size: 14px;
  color: #2c3e50;
  border: 1.5px solid #d5dde5;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237f8c9a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
}

.filter-select:focus {
  border-color: #6c8ebf;
  box-shadow: 0 0 0 3px rgba(108, 142, 191, 0.15);
}

.btn-add {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 22px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #6c8ebf, #4a6fa5);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(74, 111, 165, 0.3);
  transition: transform 0.15s, box-shadow 0.15s;
}

.btn-add:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(74, 111, 165, 0.4);
}

.btn-add:active {
  transform: translateY(0);
}

.btn-icon {
  font-size: 18px;
  line-height: 1;
  font-weight: 400;
}

/* 表格容器 */
.table-wrapper {
  flex: 1;
  width: 100%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(44, 62, 80, 0.08);
  overflow: auto;
  min-height: 0;
}

/* 表格 */
.product-table {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.product-table thead {
  background: linear-gradient(135deg, #eef3f9, #e3ebf5);
  position: sticky;
  top: 0;
  z-index: 2;
}

.product-table thead th {
  padding: 16px 20px;
  font-size: 13px;
  font-weight: 700;
  color: #4a6fa5;
  text-align: left;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-bottom: 2px solid #d8e2ee;
  white-space: nowrap;
}

.product-table tbody tr {
  border-bottom: 1px solid #eef2f6;
  transition: background 0.15s;
}

.product-table tbody tr:last-child {
  border-bottom: none;
}

.product-table tbody tr:hover {
  background: #f8fafc;
}

.product-table tbody td {
  padding: 16px 20px;
  color: #2c3e50;
  vertical-align: middle;
}

/* 类别标签 */
.tag {
  display: inline-block;
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 500;
  color: #4a6fa5;
  background: #eaf0f8;
  border-radius: 20px;
}

/* 商品名称 */
.name-cell {
  font-size: 15px;
  font-weight: 600;
  color: #2c3e50;
}

/* 价格 */
.price-cell {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.currency {
  font-size: 13px;
  color: #8896a6;
}

.amount {
  font-size: 18px;
  font-weight: 700;
  color: #e8710a;
  letter-spacing: -0.3px;
}

/* 删除按钮 */
.btn-delete {
  padding: 7px 18px;
  font-size: 13px;
  font-weight: 500;
  color: #e05252;
  background: #fdeaea;
  border: 1.5px solid #f5c6c6;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-delete:hover {
  background: #e05252;
  color: #fff;
  border-color: #e05252;
  box-shadow: 0 3px 10px rgba(224, 82, 82, 0.3);
}

.btn-delete:active {
  transform: scale(0.97);
}

/* 空状态 */
.empty-cell {
  text-align: center;
  padding: 60px 20px !important;
  color: #a0aec0;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

/* 模态框 */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(44, 62, 80, 0.45);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.dialog {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(44, 62, 80, 0.3);
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 24px 16px;
}

.dialog-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.dialog-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #9aa8b6;
  background: #f2f5f8;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  padding: 0;
}

.dialog-close:hover {
  background: #e6ebf0;
  color: #5a6b7c;
}

.dialog-body {
  padding: 8px 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-field label {
  font-size: 13px;
  font-weight: 600;
  color: #5a6b7c;
}

.form-field input {
  padding: 11px 14px;
  font-size: 14px;
  color: #2c3e50;
  border: 1.5px solid #d5dde5;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
  width: 100%;
}

.form-field input:focus {
  border-color: #6c8ebf;
  box-shadow: 0 0 0 3px rgba(108, 142, 191, 0.15);
}

.form-field input::placeholder {
  color: #b0bcc9;
}

.field-readonly {
  background: #f5f7fa;
  color: #8896a6 !important;
  cursor: not-allowed;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px 22px;
}

.btn-cancel,
.btn-confirm {
  padding: 10px 22px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  transition: background 0.2s, transform 0.15s;
}

.btn-cancel {
  color: #5a6b7c;
  background: #eef2f6;
}

.btn-cancel:hover {
  background: #e2e8ef;
}

.btn-confirm {
  color: #fff;
  background: linear-gradient(135deg, #6c8ebf, #4a6fa5);
  box-shadow: 0 4px 12px rgba(74, 111, 165, 0.3);
}

.btn-confirm:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(74, 111, 165, 0.4);
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>