/*
  -> Função para obter a lista de bebidas na taverna (via requisição GET)
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/bebidas';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.bebidas.forEach(item => insertList(item.bebida, item.tipo, item.ano, item.categoria, item.produtor))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  -> Função para carregamento inicial da lista
*/
getList()

/*
  -> Função para adicionar uma bebida na lista (via requisição POST)
*/
const postItem = async (inputBebida, inputTipo, inputAno, inputCategoria, inputProdutor) => {
  const formData = new FormData();
  formData.append('bebida', inputBebida);
  formData.append('tipo', inputTipo);
  formData.append('ano', inputAno);
  formData.append('categoria', inputCategoria);
  formData.append('produtor', inputProdutor);

  let url = 'http://127.0.0.1:5000/bebida';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  -> Função para criar um botão close para cada bebida da taverna
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  -> Função para remover uma bebida da taverna (click no botão close)
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Está certo disso?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Pronto, bebida removida (espero que tenha sido bebida)!")
      }
    }
  }
}

/*
  -> Função para remover uma bebida da taverna (via requisição DELETE)
*/
const deleteItem = (item) => {
  console.log(item)
  let url = `http://127.0.0.1:5000/bebida?bebida=${encodeURIComponent(item)}`;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  -> Função para adicionar uma nova bebida na taverna com nome, tipo, ano, categoria e produtor
*/
const newItem = () => {
  let inputBebida = document.getElementById("newBebida").value;
  let inputTipo = document.getElementById("newTipo").value;
  let inputAno = document.getElementById("newAno").value;
  let inputCategoria = document.getElementById("newCategoria").value;
  let inputProdutor = document.getElementById("newProdutor").value;

  if (inputBebida === '') {
    alert("Escreva o nome de uma bebida!");
  } else if (isNaN(inputAno)) {
    alert("Ano deve ser numérico!");
  } else {
    insertList(inputBebida, inputTipo, inputAno, inputCategoria, inputProdutor)
    postItem(inputBebida, inputTipo, inputAno, inputCategoria, inputProdutor)
    alert("Bebida incluída!")
  }
}

/*
  Função para inserir bebidas na lista
*/
const insertList = (bebida, tipo, ano, categoria, produtor) => {
  var item = [bebida, tipo, ano, categoria, produtor];
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1));
  document.getElementById("newBebida").value = "";
  document.getElementById("newTipo").value = "";
  document.getElementById("newAno").value = "";
  document.getElementById("newCategoria").value = "";
  document.getElementById("newProdutor").value = "";

  removeElement();
}

/*
  -> Função para atualizar o ano dos bebidas (via requisição PUT)
*/
const updateYear = () => {
  const bebidaId = parseInt(document.getElementById("updateBebidaId").value);
  const newYear = parseInt(document.getElementById("newYear").value);
  if (isNaN(bebidaId) || isNaN(newYear)) {
    alert("Por favor, insira o ID da bebida e o novo ano corretamente.");
    return;
  }
  // Criar um objeto FormData para enviar os dados como um formulário
  const formData = new FormData();
  formData.append('bebida_id', bebidaId);
  formData.append('new_bebida_year', newYear);
  // Fazer a solicitação PUT com a nova FormData
  const url = 'http://127.0.0.1:5000/bebidaUpdate';
  fetch(url, {
    method: 'put',
    body: formData
  })
    .then((response) => {
      if (response.ok) {
        // Atualizar a célula da tabela com o novo ano
        updateTableCell(bebidaId, newYear);
        alert("Ano do bebida atualizado com sucesso!");
        setTimeout(() => {
          location.reload();
        }, 500);
      } else {
        throw new Error('Erro na atualização do ano do bebida.');
      }
    })
    .catch((error) => {
      console.error('Erro:', error);
      alert("Ocorreu um erro ao atualizar o ano do bebida.");
    });
}

/*
  -> Função para atualizar a célula da tabela com o novo ano
*/ 
const updateTableCell = (bebidaId, newYear) => {
  const table = document.getElementById('myTable');
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    const cellId = parseInt(row.cells[0].textContent);
    if (cellId === bebidaId) {
      // Encontrou a linha correspondente, atualize a célula de ano
      row.cells[2].textContent = newYear;
      break; // Pode sair do loop, pois encontrou a correspondência
    }
  }
}

/*
  -> Função para adicionar as notas de um bebida
*/
const addNote = () => {
  const bebidaId = parseInt(document.getElementById("addNoteBebidaId").value);
  const texto = document.getElementById("addNoteTexto").value;
  if (isNaN(bebidaId)) {
    alert("Por favor, insira o ID do bebida corretamente.");
    return;
  }
  const formData = new FormData();
  formData.append("bebida_id", bebidaId);
  formData.append("texto", texto);
  const url = "http://127.0.0.1:5000/nota";
  fetch(url, {
    method: "post",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        // Limpe os campos após a adição bem-sucedida
        document.getElementById("addNoteBebidaId").value = "";
        document.getElementById("addNoteTexto").value = "";
        alert("Nota adicionada com sucesso!");
      } else {
        throw new Error("Erro ao adicionar nota.");
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao adicionar a nota.");
    });
};

/*
  -> Função para buscar todas as informações de um bebida (via requisição GET) 
*/
function getBebidaInfo() {
  // Obtenha o nome do bebida do campo de entrada
  const bebidaName = document.getElementById('bebidaName').value;

  // Faça a chamada para o endpoint /bebida
  fetch(`http://127.0.0.1:5000/bebida?bebida=${bebidaName}`, {
      method: 'GET',
      headers: {
          'accept': 'application/json',
      },
  })
  .then(response => response.json())
  .then(data => {
      // Exiba as informações do bebida na página
      const bebidaInfoResult = document.getElementById('bebidaInfoResult');
      bebidaInfoResult.innerHTML = `<h3>Informações da Bebida</h3>
          <p>Nome da Bebida: ${data.bebida}</p>
          <p>Tipo: ${data.tipo}</p>
          <p>Ano: ${data.ano}</p>
          <p>Categoria: ${data.categoria}</p>
          <p>Produtor: ${data.produtor}</p>         
          <p>Total de Notas: ${data.total_notas}</p>`;


      // Se houver notas, exiba-as também
      if (data.notas && data.notas.length > 0) {
          bebidaInfoResult.innerHTML += '<h4>Notas:</h4>';
          data.notas.forEach(nota => {
              bebidaInfoResult.innerHTML += `<p>${nota.texto}</p>`;
          });
      }
  })
  .catch(error => {
      console.error('Erro ao buscar informações do bebida:', error);
      const bebidaInfoResult = document.getElementById('bebidaInfoResult');
      bebidaInfoResult.innerHTML = '<p>Ocorreu um erro ao buscar informações da bebida.</p>';
  });
}








/*
  -> Função que busca piadas aleatórias através da API Official Joke API
*/
const getJokes = async () => {
  let url = 'https://official-joke-api.appspot.com/random_joke';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jokes:', error);
    return null;
  }
};

/*
  -> Função para popular as piadas no frontend
*/
const populateJokes = async () => {
  const joke = await getJokes();
  const jokesContent = document.getElementById('jokesContent');
  
  jokesContent.innerHTML = ''; // Clear previous content
  
  if (joke) {
    const jokeElement = document.createElement('p');
    jokeElement.textContent = `${joke.setup} - ${joke.punchline}`;
    jokesContent.appendChild(jokeElement);
  } else {
    jokesContent.textContent = 'Erro ao buscar piada.';
  }
}

// Chamar a função para popular a página com piadas
populateJokes();

/*
  -> Função para buscar imagens de avatares em estilo pixel art na API DiceBear
*/
const fetchFantasyImages = async () => {
  try {
    const response = await fetch('https://api.dicebear.com/6.x/pixel-art/svg');
    if (!response.ok) {
      throw new Error('Erro ao buscar imagem de avatar.');
    }
    const imageUrl = response.url;

    // Atualize a imagem no elemento de exibição
    const fantasyImageElement = document.getElementById('fantasyImage');
    fantasyImageElement.src = imageUrl;
  } catch (error) {
    console.error('Erro ao buscar imagem de avatar:', error);
  }
};

// Chame a função para buscar uma imagem de avatar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
  fetchFantasyImages();
});