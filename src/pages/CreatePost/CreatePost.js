import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [dat, setDat] = useState("");
  const [phone, setphone] = useState("");

  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { insertDocument, response } = useInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate phone
    try {
      new URL(phone);
    } catch (error) {
      setFormError("Precisa de uma data");
    }

    // create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // check values
    if (!title || !dat || !phone || !tags || !body ) {
      setFormError("Por favor, preencha todos os campos!");
    }

    console.log(tagsArray);

    console.log({
      title,
      dat,
      phone,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    if(formError) return

    insertDocument({
      title,
      dat,
      phone,
      body,
      tags: tagsArray,
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
            placeholder="Digite o n..."
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
            placeholder="Insira a data do agendamento"
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
            placeholder="Insira o número do cliente"
            onChange={(e) => setphone(e.target.value)}
            value={phone}
          />
        </label>
        <label>
          <span>Valor pago:</span>
          <textarea
            name="body"
            required
            placeholder="Insira aqui se o cliente já algum valor...."
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>
            Qual o espaço cliente alugou ? Show ou Piscina
          ?</span>
          <input
            type="text"
            name=""
            required
            placeholder="Informe qual foi o salão que o cliente alugou... Clube Gonzagão ou GonzagãoShow"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
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
