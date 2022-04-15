import React from "react";
import { NotFound } from './../../components/NotFound/NotFound';
import { useNavigate } from 'react-router-dom';


export const NotFoundPage = () => {


  
  const navigate = useNavigate()
  return (
        <NotFound title = "Sorry, the page you visited does not exist." buttonText="Back home" buttonAction ={() => navigate("/")}/>
  );
};

