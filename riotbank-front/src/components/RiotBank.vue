<template>
  <div class="title">
    <h3>Teste Engenheiro de Software Full Stack</h3>

    <div class="mainPage">
      <div class="regist-search">
        <button
          @click="() => TogglePopup('buttonTrigger')"
          type="button"
          class="btn"
        >
          Cadastrar
        </button>
        <input
          type="text"
          v-model="search"
          class="search"
          @change="filterUser"
          placeholder="Procurar"
        />
      </div>

      <Popup
        v-if="triggers.buttonTrigger"
        :TogglePopup="() => TogglePopup('buttonTrigger')"
      >
        <form>
          <label>Nome</label>
          <input v-model="name" placeholder="Digite seu nome" type="text" />
          <label>Idade</label>
          <input v-model="age" placeholder="0" type="number" />
          <label>GitHub User</label>
          <input v-model="github" placeholder="Usuário do GitHub" type="text" />
          <label>CEP</label>
          <input
            v-model="cep"
            @blur="handleCep"
            placeholder="00.000-000"
            type="text"
          />
          <label>Estado</label>
          <select v-model="state" placeholder="---" type="text">
            <option>
              {{ state }}
            </option>
          </select>
          <label>Cidade</label>
          <select v-model="city" placeholder="Selecione sua cidade" type="text">
            <option>
              {{ city }}
            </option>
          </select>
          <label>Bairro</label>
          <select
            v-model="neighborhood"
            placeholder="Selecione seu Bairro"
            type="text"
          >
            <option>
              {{ neighborhood }}
            </option>
          </select>
          <label>Rua</label>
          <input v-model="street" placeholder="Digite sua Rua" type="text" />
          <label>Numero</label>
          <input v-model="number" placeholder="---" type="text" />
          <label>Complemento</label>
          <input
            v-model="comp"
            placeholder="Ex: Casa 01, Ap20/Bl01 "
            type="text"
          />
        </form>
        <div class="buttons">
          <button
            class="btn2"
            type="button"
            @click="() => TogglePopup('buttonTrigger')"
          >
            Sair
          </button>
          <button class="btn" @click="handleRegister" type="button">
            Salvar
          </button>
        </div>
      </Popup>
      <div class="allUsers">
        <table class="content-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>GitHub User</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in filteredUsers" :key="user._id">
              <td>{{ index + 1 }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.age }}</td>
              <td>{{ user.github.login }}</td>
              <td>{{ user.address }}</td>
              <td>
                <img
                  :src="trashImg"
                  @click="() => TogglePopup('trashTrigger', user.id)"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="triggers.trashTrigger" class="delete">
          <h5>Deseja mesmo deletar o usuário?</h5>
          <button
            class="deleteButton1"
            @click="() => TogglePopup('trashTrigger')"
          >
            Cancelar
          </button>
          <button class="deleteButton2" @click="handleDelete">Deletar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Popup from './Popup.vue';
import { ref } from 'vue';
import axios from 'axios';
export default {
  async mounted() {
    const response = await axios.get('http://localhost:8080/users');
    console.log(response.data);
    this.users = response.data;
  },
  components: { Popup },
  name: 'RiotBank',
  data() {
    return {
      name: '',
      age: '',
      github: '',
      cep: '',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
      number: '',
      comp: '',
      users: [],
      search: '',
      trashImg: require('/home/paulo/Projetos/pv209/riotbank-front/src/Images/trash (5).svg'),
      deleteId: '',
    };
  },

  computed: {
    filteredUsers() {
      return this.users.filter((user) => {
        const name = user.name.toString().toLowerCase();
        const github = user.github.login.toLowerCase();
        const age = user.age.toString();
        const address = user.address.toString().toLowerCase();
        const searchTerm = this.search.toLowerCase();

        return (
          github.includes(searchTerm) ||
          name.includes(searchTerm) ||
          age.includes(searchTerm) ||
          address.includes(searchTerm)
        );
      });
    },
  },
  methods: {
    verifyInputs(inputs) {
      if (inputs !== '') return true;
      return false;
    },

    async handleCep() {
      const cep = this.cep.replace(/\D/g, '');
      if (cep != '') {
        const validaCep = /^[0-9]{8}$/;
        if (validaCep.test(cep)) {
          const requestAddress = await axios(
            `http://viacep.com.br/ws/${this.cep}/json/`,
          );
          console.log(requestAddress.data);
          this.state = requestAddress.data.uf;
          this.city = requestAddress.data.localidade;
          this.neighborhood = requestAddress.data.bairro;
          this.street = requestAddress.data.logradouro;
        }
      }
    },
    async handleRegister() {
      if (
        this.verifyInputs(this.name) &&
        this.verifyInputs(this.age) &&
        this.verifyInputs(this.github) &&
        this.verifyInputs(this.cep)
      ) {
        const gitRequest = await axios(
          `https://api.github.com/search/users?q=${this.github}`,
        );
        console.log(gitRequest.data);
        const response = await axios.post('http://localhost:8080/users', {
          name: this.name,
          age: this.age,
          address: `${this.street},${this.number}-${this.neighborhood}-${this.city}/${this.state}`,
          github: gitRequest.data.items[0],
        });
        console.log(response.data);
        this.data = response;
        window.location.reload(true);
      }
    },
    async handleDelete() {
      await axios.delete(`http://localhost:8080/users/${this.deleteId}`);
      window.location.reload(true);
    },
  },

  setup() {
    const triggers = ref({
      buttonTrigger: false,
      trashTrigger: false,
    });
    const TogglePopup = (trigger, id) => {
      triggers.value[trigger] = !triggers.value[trigger];
      if (id) this.deleteId = id;
    };
    return {
      Popup,
      triggers,
      TogglePopup,
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

.btn {
  outline: none;
  display: block;
  border: 0;
  font-size: 16px;
  padding: 16px 25px;
  border-radius: 4px;
  background-color: #e2b874;
  color: #ffff;
  cursor: pointer;
  margin: 20px;
  font-family: 'Poppins';
}
.btn2 {
  outline: none;
  display: block;
  border: 0;
  font-size: 16px;
  padding: 16px 25px;
  border-radius: 4px;
  background-color: #ffffff;
  border: 1px solid #e2b874;
  color: #e2b874;
  cursor: pointer;
  margin: 20px;
  font-family: 'Poppins';
}
.mainPage {
  widows: 100%;
  display: flex;
  margin: 100px;
  border: 1px solid #dfe3e6;
  margin-bottom: 0px;
  margin-left: 150px;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 0px;
  z-index: 30;
  background-color: #ffff;
}

form {
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 390px;
}

label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Poppins';
  font-weight: bold;
}

input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
.buttons {
  display: flex;
}
.content-table {
  border-collapse: collapse;
  margin: 25px 0;
  width: 100%;
  font-size: 0.9em;
  font-family: 'Poppins';
  min-width: 400px;
  border-radius: 5px 5px 0 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.content-table thead tr {
  background-color: #dfe3e6;
  text-align: center;
  font-weight: bold;
}
.content-table th,
.content-table td {
  padding: 12px 15px;
}
.content-table tbody tr {
  border-bottom: 1px solid #dddddd;
}
.allUsers {
  width: 100%;
}
.title h3 {
  font-family: 'Poppins';
  color: #000000;
}
.title {
  width: 100%;
  background-color: #dfe3e6;
  display: flex;
  flex-direction: column;
  border: 0;
  margin: 0;
}
.regist-search {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: space-between;
}
.search {
  padding: 10px 6px;
  box-sizing: border-box;
  border: 1px solid #dfe3e6;
  border-bottom: 1px solid #ddd;
  color: #555;
  float: right;
  margin-left: 200px;
  align-self: flex-end;
  width: 35%;
  margin-bottom: 30px;
}
.delete {
  position: fixed;
  flex-direction: row;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins';
}
.deleteButton1 {
  outline: none;
  display: block;
  border: 0;
  font-size: 16px;
  padding: 16px 25px;
  border-radius: 4px;
  background: #ffffff;
  border: 1px solid #d83636;
  border-radius: 4px;
  font-family: 'Poppins';
  font: #d83636;
  cursor: pointer;
  margin: 20px;
}

.deleteButton2 {
  outline: none;
  display: block;
  border: 0;
  font-size: 16px;
  padding: 16px 25px;
  border-radius: 4px;
  background: #d83636;
  border-radius: 4px;
  font-family: 'Poppins';
  font: #ffffff;
  cursor: pointer;
  margin: 20px;
}
</style>
