# Ambiente de Desenvolvimento

- Comando padrão: `npm run dev`
- Porta configurada: `3001`
- O servidor inicia em: `http://localhost:3001/`

## Detalhes da configuração
- A porta foi fixada via script do `package.json`:
  - `"dev": "next dev -p 3001"`
- Isso garante que o Next.js sempre suba na porta 3001.

## Observações (Windows/PowerShell)
- Se houver bloqueio para rodar `npm` por políticas de execução:
  - Execute na sessão: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`
- Se a porta 3001 estiver ocupada, finalize o processo que está ouvindo nessa porta:
  - `netstat -ano | findstr :3001` para obter o PID
  - `taskkill /PID <PID> /F` para encerrar

## Verificação
- Após `npm run dev`, acesse `http://localhost:3001/` e verifique o funcionamento.

