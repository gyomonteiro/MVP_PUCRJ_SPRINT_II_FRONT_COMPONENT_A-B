# MVP Frontend - Taverna Virtual

Este projeto contempla os requisitos para a entrega do MVP da **Sprint II: Arquitetura de Software** do curso de Pós Graduação em Engenharia de Software da PUC RIO.

O objetivo é utilizar do conteúdo ensinado durante as aulas para a criação de um sistema web em que seus diferentes componentes atuem como sistemas autônomos.
Este é um projeto de uma taverna virtual com uma interface web simples. Ele permite que você gerencie bebidas, adicione notas e consulte informações sobre bebidas. Também apresenta piadas engraçadas e avatares em estilo pixel art usando APIs externas.

Para os códigos aqui encaminhados, será explorado o **componente A do MVP, assim como o B1 e B2, que são as APIs externas utilizadas**.

## Componente A - Frontend
O componente A escolhido para o projeto é o frontend que consiste em arquivos HTML (index.html), CSS (styles.css), e JavaScript (scripts.js). 

Todos estes arquivos fazem parte deste mesmo repositório.

## Componentes B1 e B2 - Externos

- **Official Joke API**: Fornece piadas aleatórias.
Para obter uma piada aleatória, você pode fazer uma solicitação GET para o seguinte endpoint da API:
```
https://official-joke-api.appspot.com/random_joke
```
Este endpoint permite acesso público e não requer uma chave de API para ser incluída na solicitação.
Aqui está um exemplo de como fazer uma solicitação para obter uma piada aleatória usando a API Official Joke API em Python:
```
import requests

response = requests.get("https://official-joke-api.appspot.com/random_joke")

if response.status_code == 200:
    data = response.json()
    joke = f"{data['setup']} - {data['punchline']}"
    print(f"Piada aleatória: {joke}")
else:
    print("Não foi possível obter a piada.")
```
Certifique-se de respeitar os termos de uso da API Official Joke API conforme descrito em https://official-joke-api.appspot.com.

Para mais informações sobre a API Official Joke API, consulte a documentação oficial em https://official-joke-api.appspot.com.

- **DiceBear API**: Gera avatares em estilo pixel art.
Para obter um avatar em estilo pixel art, você pode fazer uma solicitação GET para o seguinte endpoint da API:
```
https://api.dicebear.com/6.x/pixel-art/svg
```
Este endpoint permite acesso público e não requer uma chave de API para ser incluída na solicitação.
Aqui está um exemplo de como fazer uma solicitação para obter um avatar usando a API DiceBear em Python:
```
import requests

response = requests.get("https://api.dicebear.com/6.x/pixel-art/svg")

if response.status_code == 200:
    image_url = response.url
    print(f"Avatar em estilo pixel art: {image_url}")
else:
    print("Não foi possível obter o avatar.")
```
Certifique-se de respeitar os termos de uso da API DiceBear conforme descrito em https://www.dicebear.com/terms.

Para mais informações sobre a API DiceBear, incluindo detalhes sobre outros estilos de avatares e recursos disponíveis, consulte a documentação oficial em https://www.dicebear.com/.


---
## Como executar

Basta clonar o projeto e abrir o arquivo index.html no browser de sua preferência para a execução.

## Executando com Docker

Você pode executar o projeto em um contêiner Docker. 
Certifique-se de ter o Docker instalado no seu sistema.

Clone o repositório para o seu computador (se já não o fez):

```
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

1. Navegue até o diretório do projeto:
```
cd nome-do-repositorio
```

2. Construa a imagem Docker (o nome da imagem é de sua escolha, utilizei "componente_a"no exemplo abaixo):
```
docker build -t nome_da_imagem .
```

3. Execute o contêiner Docker:

```
docker run -p 8080:80 nome_da_imagem
```

4. O aplicativo estará acessível no seu navegador em http://localhost:8080.


Lembre-se de que você pode personalizar o nome da imagem Docker (nome_da_imagem).

Para encerrar a execução do contêiner, você pode pressionar Ctrl+C no terminal onde o contêiner está sendo executado.

Independente do modo de execução, recomendo estar com o backend rodando para que seja possível performar os testes do frontend com maior consistência, de forma a permitir com que atualizações na página persistam os dados incluídos previamente.

Componente do backend: https://github.com/gyomonteiro/MVP_PUCRJ_SPRINT_II_FRONT_COMPONENT_A-B.git

