import React from "react";
import { NotFound } from './../../components/NotFound/NotFound';
import { useNavigate } from 'react-router-dom';


export const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
        <NotFound title="Page not found" buttonText="Home" buttonAction ={() => navigate("/")}/>
  );
};

