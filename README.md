# Betterbox

![Imagem do projeto](./public/demonstracao.png)

### [Visitar Projeto](https://betterbox-luiz2k.vercel.app/)
Acesse também o repositório do [Back-end](https://github.com/luiz2k/betterbox-api)

---

## 📝 Sobre o projeto
Projeto full stack onde eu utilizo a mesma ideia de um projeto antigo, [Catalogo de Filmes](https://catalogodefilmes-luiz2k.vercel.app/), onde o usuário tem a possibilidade de ver os filmes mais assistidos no momento e os filmes com as melhores avaliações. Porém para esse novo projeto foi adicionado a possibilidade do usuário poder criar a sua conta, fazer comentários, e gerenciar seus filmes assistidos e favoritos.

### Funcionalidades visíveis para o usuário
- **Registro e Login:** Foi desenvolvido um sistema de registro e login, possibilitando assim cada usuário gerenciar seus filmes.
- **Gerenciamento os filmes:** Possibilidade do usuário listar seus filmes assistidos e favoritos.
- **Comentários:** Possibilidade dos usuários poderem fazer comentário nos filmes.
- **Alterar dados:** Página de configuração onde o usuário poderá alterar os seus dados cadastrados.
- **Perfil:** Página de perfil para o usuário poder ver todos os filmes listados como assistidos e favoritos.

### Funcionalidades internas
- **Válidação dos formulários:** Para a válidação dos formulários da aplicação, foi utilizado o **React Hook Form** e o **Zod**. 
- **Fluxo de Autenticação:** Toda a parte do fluxo de autenticação da aplicação foi desenvolvido utilizando o **NextAuth**. nesse fluxo de autenticação foi implementado **access token** e **refresh token**.
- **Consumo de API:** Para essa aplicação foi consumida a API [Betterbox](https://github.com/luiz2k/betterbox-api) (api da aplicação). E também foi consumida a API do [The Movie Database](https://developer.themoviedb.org/reference/intro/getting-started), para poder obter a lista de filmes.

### Tecnologias utilizada
- HTML / CSS / TypeScript
- Next.JS
- Tailwind CSS
- Prettier / ESLint
- React Hook Form / Zod
- Zustand
- NextAuth