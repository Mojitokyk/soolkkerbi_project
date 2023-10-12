import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NoticeFrm from "./NoticeFrm";
import axios from "axios";
import Swal from "sweetalert2";

const PartyModify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const taste = location.state.taste;
  console.log(taste);

  return <></>;
};

export default PartyModify;
