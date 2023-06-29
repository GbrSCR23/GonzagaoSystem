import styles from "./EditPost.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  console.log(post);

  const [title, setTitle] = useState("");
  const [dat, setDat] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("")
  const [body, setBody] = useState("");
  const [loc, setLoc] = useState("");
 // const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  // fill form data
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setDat(post.dat);
      setPhone(post.phone);
      setPrice(post.price)
      setBody(post.body);
      setLoc(post.loc);

//      const textTags = post.tags.join(", ");

//      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { updateDocument, response } = useUpdateDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
   setFormError("");

    // validate phone
  //  try {
 //   new URL(phone);
  //  } catch (error) {
  //    setFormError("Digite um de telefone.");
  //  }

    // create tags array
 //   const tagsArray = tags.split(",").map((tag) => tag.trim());

 //   console.log(tagsArray);

    console.log({
      title,
      dat,
      phone,
      price,
      body,
      loc,
  //    tags: tagsArray,
    });

    const data = {
      title,
      dat,
      phone,
      price,
      body,
      loc,
    //  tags: tagsArray,
    };

    console.log(post);

    updateDocument(id, data);

    // redirect to home page
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando evento: </h2>
          <p>Altere os dados do evento como desejar</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Nome do cliente:</span>
              <input
                type="text"
                name="text"
                required
                placeholder="Pense num bom título..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />

                          <label>

              <span>Data do evento:</span>
              <textarea
                name=""
                required
                placeholder="Insira o conteúdo do evento"
                onChange={(e) => setDat(e.target.value)}
                value={dat}
              ></textarea>
            </label>

            </label>
            <label>
              <span>Valor já pago::</span>
              <textarea
                name=""
                required
                placeholder="Insira o conteúdo do post"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              ></textarea>
            </label>




            
            <label>
              <span>Telefone:</span>
              <input
                type="text"
                name=""
                required
                placeholder="Insira as tags separadas por vírgula"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </label>

            
            <label>
              <span>Local:</span>
              <input
                type="text"
                name=""
                required
                placeholder="Insira as tags separadas por vírgula"
                onChange={(e) => setLoc(e.target.value)}
                value={loc}
              />
            </label>
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde.. .
              </button>
            )}
            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
