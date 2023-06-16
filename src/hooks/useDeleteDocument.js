import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore"; 

const initialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => { //nome da constante deleteReducer
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null }; //deletando documento
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const deleteDocument = async (id) => { //recebendo o id 
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const deletedDocument = await deleteDoc(doc(db, docCollection, id)); //deletando o documento  //await deletedoc(doc(db, doccolletion, id )) == passando a referencia do banco de dados(db), o documento(collection) e também o id(id) 

      checkCancelBeforeDispatch({
        type: "DELETED_DOC",
        payload: deletedDocument,
      }); //aqui a gente termina o reload 
    } catch (error) {
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
    }
  }; //em caso de erro

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { deleteDocument, response };
};
