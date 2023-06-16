import { useLocation } from "react-router-dom"; //Este outro hook serve para exibir as informações de navegação da pessoa usuária atual. Pode ser útil para realizar alguma tarefa a partir da mudança deste estado. Bom para perfomance da execução
import { useMemo } from "react"; //bom para perfomance de execução, conseguimos ver se um objeto é igual ao outro ou não, mesmo tendo o mesmo valor ele indetifca se são iguais. como se o nosso objeto tivesse um id único.

export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
