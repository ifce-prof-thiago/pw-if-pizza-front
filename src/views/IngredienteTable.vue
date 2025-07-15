<script setup>
import { ref } from 'vue'
const search = ref('')
const ingredientes = ref([])

async function buscar() {
  const resp = await fetch('http://localhost:8080/ingredientes?nome=' + search.value)
  const json = await resp.json()
  ingredientes.value = json
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
  <h2>Lista de Ingredientes</h2>

  <div class="container">
    <!-- Barra de Busca -->
    <div class="search-bar">
      <input v-model="search" type="text" id="search" placeholder="Buscar por nome..." />
      <button @click="buscar()" id="searchButton">Buscar</button>
    </div>

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
</template>
