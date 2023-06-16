import styles from "./Search.module.css";

// hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery"; 

// components
import PostDetail from "../../components/PostDetail";
import { Link } from "react-router-dom";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_container}>
      <h1>Resultados encontrados para: {search}</h1>
      <div className="post-list">
        {posts && posts.length === 0 && (
          <>
            <p>Não foram encontrados posts a partir da sua busca...</p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </>
          //Quando não há nenhum resultado encontrado na busca. e no fim um link que será exibido pra voltar até a nossa página home.
        )}
        
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)} 
        
      </div>
    </div>
    //Esse é o resultado quando está tudo certo, quando recebemos o resultado.
  );
};

export default Search;
