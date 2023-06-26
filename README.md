SEste é um projeto [Next.js](https://nextjs.org/) inicializado com [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Como rodar

Para rodar, digite o seguinte comando no seu terminal:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado.

## Endereço da API

Caso esteja rodando a API em uma porta diferente pode modificar a baseUrl seguindo os passos abaixo:

### Achando o arquivo
![image](https://github.com/Mateus1508/ControlePedidos-front/assets/81775179/b6a79dac-e8d9-435b-afc3-7e864b0919a3)

### mudando a baseUrl

```
const api = axios.create({
  baseURL: "https://localhost:(númeroDaPorta)/api",
});
```




