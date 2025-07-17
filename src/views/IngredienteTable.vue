<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
const search = ref('')
const ingredientes = ref([])
const qtd = ref(0)

onMounted(() => {
  buscar()
})

async function buscar() {
  const resp = await fetch('http://localhost:8080/ingredientes?nome=' + search.value)
  const json = await resp.json()
  ingredientes.value = json
  qtd.value = ingredientes.value.length
}

async function excluir(id) {
  const resp = await fetch('http://localhost:8080/ingredientes/' + id, {
    method: 'DELETE',
  })
  search.value = ''
  buscar()
}
</script>

<template>
  <div id="ingrediente_table">
    <h2>Lista de Ingredientes</h2>

    <div class="container">
      <!-- Barra de Busca -->
      <div class="search-bar">
        <input
          @keypress.enter="buscar()"
          v-model="search"
          type="text"
          id="search"
          placeholder="Buscar por nome..."
        />
        <button @click="buscar()" id="searchButton">Buscar</button>
      </div>

      <div>{{ qtd }} elementos encontrados</div>
      <!-- Tabela -->
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Preço Pequeno</th>
            <th>Preço Médio</th>
            <th>Preço Grande</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <!-- Exemplos de ingredientes -->
          <tr v-for="(item, i) in ingredientes" :key="item.id">
            <td>{{ i + 1 }}</td>
            <td>{{ item.nome }}</td>
            <td>{{ item.precoP }}</td>
            <td>{{ item.precoM }}</td>
            <td>{{ item.precoG }}</td>
            <td class="action-buttons">
              <button class="edit">Editar</button>
              <button @click="excluir(item.id)" class="delete">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
table {
  border: 1px solid black;
  border-collapse: collapse;
  background-color: #f5f5f5;
  width: 100%;
}

th,
td {
  padding: 8px;
  text-align: center;
}

th {
  background-color: #8c55b8;
  color: black;
}

tr:nth-child(even) {
  background-color: #555;
}
</style>
