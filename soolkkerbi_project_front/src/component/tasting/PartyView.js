import "./partyView.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button1 } from "../util/Buttons";
import Swal from "sweetalert2";

const PartyView = (props) => {};
const member = props.member;
const location = useLocation();
const partyNo = location.state.partyNo;
const [party, setParty] = useState({});
const navigate = useNavigate();

console.log("PartyView - location.state.partyNo: " + location.state.partyNo);

export default PartyView;
