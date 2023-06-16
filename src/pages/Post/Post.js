// CSS
import styles from "./Post.module.css";

// hooks
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  return (
    <div className={styles.post_container}>
      {post && (
        <>
          <h1>
            
            Nome do cliente:
            
      </h1>
      <h2>{post.title}</h2>
<h1>Data de agendamento:</h1>
          <h2>{post.dat}</h2>
           <h1>   Número do cliente:     </h1>
          <h2>{post.phone}</h2>
          <h1>Valor já pago pelo cliente:</h1> 
          <h2>{post.price}</h2>
          <h3>Local Alugado:</h3>
          <h2>{post.loc}</h2>
           
          
          
        </>
      )}
    </div>
  );
};

export default Post;
