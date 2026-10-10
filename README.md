# SIDE QUEST — Catálogo Online

Manual oficial de operação do catálogo digital da Side Quest.

## 1. Objetivo

O catálogo apresenta produtos, imagens, descrições, preços, categorias, promoções e canais oficiais de compra.

O cliente pode consultar os produtos e seguir para os canais de venda da loja. O projeto não processa pagamentos nem mantém carrinho ou cadastro de clientes.

## 2. Tecnologias

- Astro: site e servidor local de desenvolvimento.
- Decap CMS: painel administrativo.
- Node.js e npm: ambiente de execução.
- Git e GitHub: controle de versão e publicação do código.
- Cloudflare: hospedagem e publicação do catálogo.

## 3. Comandos principais

### Iniciar o ambiente

No Termux, execute:

    sq

Esse comando inicia a sessão tmux `sidequest`, com duas janelas:

- Astro: porta 4321.
- Decap CMS: porta 8081.

O navegador abre o painel:

http://localhost:4321/admin/

### Salvar e publicar alterações

Primeiro, salve o produto no painel administrativo. Depois, no Termux, execute:

    salvar

O script mostra os arquivos preparados e solicita confirmação antes de criar o commit e enviar as alterações ao GitHub.

Revise a lista antes de confirmar. Após o envio, aguarde a conclusão do deploy no Cloudflare.

## 4. Alternar entre as janelas

Dentro do tmux:

- Pressione Ctrl+B e depois N para ir à próxima janela.
- Pressione Ctrl+B e depois P para voltar à janela anterior.
- Pressione Ctrl+B e depois D para sair da sessão sem encerrar os servidores.

Para retornar à sessão:

    tmux attach-session -t sidequest

Para encerrar os dois serviços:

    tmux kill-session -t sidequest

## 5. Fluxo de trabalho

1. Execute `sq`.
2. Aguarde o painel abrir.
3. Edite o produto, categoria, canal ou promoção.
4. Salve a alteração no painel.
5. Confira o resultado no catálogo local.
6. Execute `salvar` no Termux.
7. Revise os arquivos listados pelo script.
8. Confirme somente se as alterações estiverem corretas.
9. Aguarde o envio ao GitHub e a conclusão do deploy.
10. Confira o catálogo publicado.

Salvar no painel não publica automaticamente o catálogo. A publicação ocorre depois do envio ao GitHub e da conclusão do deploy.

## 6. Segurança

- Não publique a configuração local `public/admin/config.yml` sem revisar seu conteúdo.
- Não inclua senhas, tokens ou chaves privadas no repositório.
- Não use `git add .` como atalho para publicar todos os arquivos.
- Revise a lista de arquivos antes de confirmar a publicação.
- Preserve os backups locais e não os publique sem necessidade.
- Os comandos `sq` e `salvar` estão configurados no arquivo `~/.bashrc` deste Termux.
- O script `scripts/publicar.sh` é local e não está versionado neste momento.

## 7. Diagnóstico

Confira o estado do Git:

    git status -sb

Confira o último commit:

    git log -1 --oneline

Confira os servidores:

    pgrep -af 'astro dev|decap-server'

Confira as sessões tmux:

    tmux ls

Se o comando `sq` ou `salvar` não for reconhecido, execute:

    source ~/.bashrc

Se a sessão já existir, retorne com:

    tmux attach-session -t sidequest

Se o site não atualizar, confirme se o envio ao GitHub terminou com sucesso e verifique o estado do deploy no Cloudflare.

Não use `git push --force` para tentar corrigir uma publicação sem antes entender o problema.

## 8. Backups e recuperação

Antes de alterações estruturais, mantenha uma cópia dos arquivos importantes.

Para verificar os scripts locais e o diretório de backups:

    ls -la scripts
    ls -la .local-backup

Se o Termux for reinstalado ou os scripts forem apagados, será necessário restaurar os scripts e configurar novamente as funções no `~/.bashrc`.

## 9. Limites conhecidos

- O painel administrativo local foi testado.
- O fluxo de publicação pelo GitHub foi testado.
- O login OAuth do painel administrativo em produção ainda precisa ser resolvido e validado separadamente.
- A documentação e os comandos deste manual não substituem a revisão dos arquivos antes da publicação.
- O catálogo não processa pagamentos nem mantém um sistema próprio de pedidos.

---

**Side Quest — Catálogo Online**

Manual operacional do projeto. Atualize este documento sempre que os procedimentos mudarem.
