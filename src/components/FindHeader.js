import styled from "styled-components";

import { MdArrowBackIos } from "react-icons/md";
export default function FindHeader({onClick,title}) {
  return (
    <StyleHeader>
      <MdArrowBackIos style={{ position: "fixed", left: "20px" }} size={20} onClick={onClick}/>
      <span>{title}</span>
    </StyleHeader>
  );
}

const StyleHeader = styled.div`
  display: flex;
  width: 100vw;
  height: 40px;
  color: white;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
