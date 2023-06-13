import { Link } from "react-router-dom";

//Para que serve o React router?
//O React Router Dom é uma biblioteca para o React criada com o objetivo de resolver problemas de rotas para as páginas de um site e tornar o desenvolvimento muito mais simples e escalável. Com ela, podemos declarar caminhos do nosso site para renderizar componentes e até mesmo resolver parâmetros na URL

import styles from "./PostDetail.module.css";

const PostDetail = ({ post }) => {
  return (
    <div className={styles.post_detail}>
     
      <h2>{post.title}</h2>
      <h2>{post.dat}</h2>
      <p className={styles.createdby}>por: {post.createdBy}</p>
      <div className={styles.tags}>
        {post.tags.map((tag) => (
          <p key={tag}>
            <span>Espaço do evento:</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className="btn btn-outline">
        Ver
      </Link>
    </div>
  );
};

export default PostDetail;
