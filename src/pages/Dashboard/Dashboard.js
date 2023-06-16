import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

//hoks
import { useAuthValue } from "../../contexts/AuthContext"; //pra pegar informações do usuário 
import { useFetchDocuments } from "../../hooks/useFetchDocuments"; //chamando os itens do usuário, posts... 
import { useDeleteDocument } from "../../hooks/useDeleteDocument"; //importando nosso hook de deletar documento... 

const Dashboard = () => {
  const { user } = useAuthValue(); //pegando o usuário do nosso useAuthvalue(bd)
  const uid = user.uid; //e pegando o id dele e transformando em user.uid

//posts do usuário 

  const { documents: posts } = useFetchDocuments("posts", null, uid);

  const { deleteDocument } = useDeleteDocument("posts"); //importando nossa função delete documento e passamos a collection "posts"

  console.log(uid);
  console.log(posts);

  //Como usar IF Ternario?
//A sintaxe da forma curta do operador ternário é: (condição/codigoUm) ?: codigoDois; Dessa forma, caso a condição seja atendida, a própria será o código a ser executado, caso contrário, será executado o "codigoDois".
  return (
    <div className={styles.dashboard}>
      <h2>Eventos Marcados</h2>
      <p>Gerencie os seus eventos</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados eventos</p>
          <Link to="/posts/create" className="btn">
            Criar primeiro post
          </Link>
        </div>
      ) : (

        
        <div className={styles.post_header}>
          <span>Nomes</span>
          
          <span>Ações</span>
        </div>
      )}

      {posts &&
        posts.map((post) => (
          <div className={styles.post_row} key={post.id}>
            <p>{post.title}
            </p>

            <p>
            {post.dat}
            </p>
            
            <br />
            <div className={styles.actions}>
              <Link to={`/posts/${post.id}`} className="btn btn-outline">
                Ver
              </Link>
              <Link to={`/posts/edit/${post.id}`} className="btn btn-outline"> 
                Editar

                
              </Link>

          
              <button
                onClick={() => deleteDocument(post.id)}
                className="btn btn-outline btn-danger"
              >
                Excluir
              </button>
            </div>
          </div>

          //btn btn-outline são dos nosso estilos globais da aplicação 
          //post.id = significa que estamos mandando a id do nosso post pra essas funções 
        ))}
    </div>
  );
};

export default Dashboard;
