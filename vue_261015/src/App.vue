<template>
  <div id="app">
    <div class="container">
      <h1 class="title">STUDENT&nbsp;&nbsp;&nbsp;INFORMATION&nbsp;&nbsp;&nbsp;MANAGEMENT</h1>

      <div class="form-row">
        <div class="form-item">
          <label>Name:</label>
          <input v-model="form.name" type="text" />
        </div>
        <div class="form-item">
          <label>Sex:</label>
          <select v-model="form.sex">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div class="form-item">
          <label>Age:</label>
          <input v-model="form.age" type="text" />
        </div>
      </div>

      <div class="form-row center-row">
        <div class="form-item">
          <label>Major:</label>
          <input v-model="form.major" type="text" />
        </div>
        <button class="btn" @click="addStudent">Add Student</button>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>Id</th><th>Name</th><th>Sex</th><th>Age</th><th>Major</th><th>Operate</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="student.id">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.sex }}</td>
            <td>{{ student.age }}</td>
            <td>{{ student.major }}</td>
            <td>
              <button class="btn" @click="deleteStudent(index)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({ name: '', sex: 'Male', age: '', major: '' })

const students = reactive([
  { id: 1, name: 'Zhang San', sex: 'Male', age: 20, major: 'Computer' },
  { id: 2, name: 'Li Si', sex: 'Female', age: 19, major: 'English' }
])
let nextId = 3

function addStudent() {
  if (!form.name || !form.age || !form.major) {
    alert('请填写完整的姓名、年龄和专业！')
    return
  }
  students.push({ id: nextId++, ...form })
  form.name = ''; form.sex = 'Male'; form.age = ''; form.major = ''
}

function deleteStudent(index) {
  students.splice(index, 1)
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #eef4ff 0%, #f8fbff 50%, #eef7f3 100%);
  font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  color: #2c3e50;
}

.container {
  max-width: 980px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 16px;
  padding: 32px 36px 40px;
  box-shadow: 0 12px 32px rgba(30, 60, 90, 0.12);
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #1f3a5f;
  margin: 0 0 28px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e4edf7;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  align-items: flex-end;
  margin-bottom: 18px;
}

.center-row {
  justify-content: center;
}

.form-item {
  display: flex;
  flex-direction: column;
  flex: 1 1 180px;
  min-width: 160px;
}

.form-item label {
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #5a7089;
  letter-spacing: 0.3px;
}

.form-item input,
.form-item select {
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  color: #2c3e50;
  background: #f9fbfd;
  border: 1px solid #d6e2ee;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}

.form-item input:focus,
.form-item select:focus {
  background: #ffffff;
  border-color: #4a90d9;
  box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.15);
}

.btn {
  height: 40px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #4a90d9, #3573b8);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 0.15s, box-shadow 0.2s, filter 0.2s;
}

.btn:hover {
  filter: brightness(1.06);
  box-shadow: 0 6px 16px rgba(53, 115, 184, 0.35);
}

.btn:active {
  transform: translateY(1px);
  box-shadow: 0 3px 8px rgba(53, 115, 184, 0.3);
}

.table {
  width: 100%;
  margin-top: 28px;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 14px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 0 0 1px #e4edf7;
}

.table thead th {
  background: linear-gradient(135deg, #eaf2fb, #dde9f7);
  color: #1f3a5f;
  font-weight: 700;
  text-align: left;
  padding: 14px 16px;
  letter-spacing: 0.3px;
  border-bottom: 2px solid #d0e0f0;
}

.table tbody td {
  padding: 12px 16px;
  border-bottom: 1px solid #eef3f9;
  color: #3c4f63;
}

.table tbody tr:nth-child(even) td {
  background: #f9fbfd;
}

.table tbody tr:hover td {
  background: #eef6ff;
}

.table tbody tr:last-child td {
  border-bottom: none;
}

.table .btn {
  height: 32px;
  padding: 0 14px;
  font-size: 13px;
  background: linear-gradient(135deg, #e05a5a, #c94040);
}

.table .btn:hover {
  box-shadow: 0 6px 16px rgba(201, 64, 64, 0.35);
}

@media (max-width: 640px) {
  .container {
    padding: 24px 18px 28px;
  }

  .title {
    font-size: 18px;
    letter-spacing: 0.8px;
  }

  .table {
    font-size: 13px;
  }

  .table thead th,
  .table tbody td {
    padding: 10px 8px;
  }
}
</style>