import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [dat, setDat] = useState("");
  const [phone, setphone] = useState("");
  const [loc, setloc] = useState("")

  const [price, setprice] = useState("");
  // const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { insertDocument, response } = useInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate phone
   // try {
  //    new URL(phone);
 //   } catch (error) {
    //  setFormError("Precisa de uma data");
  //  }

    // create tags array
   // const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // check values
    if (!title || !dat || !phone || !loc  || !price ) {
      setFormError("Por favor, preencha todos os campos!");
    }

  //  console.log(tagsArray);

    console.log({
      title,
      dat,
      phone,
      price,
      loc,
  //    tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    if(formError) return

    insertDocument({
      title,
      dat,
      phone,
      price,
      loc,
    //  tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Agendar Evento</h2>
      
      <form onSubmit={handleSubmit}>
        <label>
          <span> Nome do Cliente:</span>
          <input
            type=""
            name=""
            required
            placeholder="Digite o nome do cliente..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

</label>
        <label>
          
          <span>Data do agendamento:</span>
          <input
            type=""
            name=""
            required
            placeholder="Insira a data do agendamento..."
            onChange={(e) => setDat(e.target.value)}
            value={dat}
          />
        </label>
        <label>




        </label>
        <label>
          <span>Número do cliente:</span>
          <input
            type="number"
            name="number"
            required
            placeholder="Insira o número do cliente..."
            onChange={(e) => setphone(e.target.value)}
            value={phone}
          />
        </label>
        <label>
          <span>Valor pago:</span>
          <textarea
            name="price"
            required
            placeholder="Insira aqui se o cliente já pagou algum valor...."
            onChange={(e) => setprice(e.target.value)}
            value={price}
          ></textarea>
        </label>
        
        <label>
          <span>Qual espaço o cliente alugou?:</span>
          <textarea
            name="loc"
            required
            placeholder="Insira aqui o espaço que o cliente alugou...."
            onChange={(e) => setloc(e.target.value)}
            value={loc}
          ></textarea>
        </label>

      

        
        {!response.loading && <button className="btn">Criar evento!</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde.. .
          </button>
        )}
      {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
