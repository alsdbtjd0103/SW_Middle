import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import InputModal from "../components/InputModal";
import { UserContext } from "../store/UserContext";
import { AiFillPlusCircle } from "react-icons/ai";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Snowfall from "react-snowfall";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";

function MainPage() {
  const userCtx = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const navigation = useNavigate();
  const ModalHandler = () => {
    setOpen((previous) => !previous);
  };

  useEffect(() => {
    //버튼을 클릭하지않고 디바이스 기능을 이용하여 뒤로 갈 때 애니메이션 방지
    userCtx.setIsButtonClick(false);
  }, []);

  const submitHandler = (e) => {
    if (userCtx.users.length < 2) {
      alert("두 개 이상 등록해주세요!");
      return;
    }
    userCtx.setIsButtonClick(true);
    var queryString = "/find";
    // userCtx.users.map((user) => queryString+=`id=${user.info.id}&`)
    // queryString = queryString.substring(0,queryString.length-1);
    // console.log(queryString);
    navigation(queryString);

    return;
  };

  return (
    <RootContainer
      initial={userCtx.isButtonClick ? { width: "0%" } : false}
      animate={
        userCtx.isButtonClick
          ? { width: "100%", transition: { duration: 0.4 } }
          : false
      }
      exit={userCtx.isButtonClick ? { x: window.innerWidth } : false}
      id="rootContainer"
    >
      <StyledHeader>
        <span className="text-black font-bold">NowMeet: 우리 지금 만나</span>
      </StyledHeader>
      <BannerText>
        <span style={{ fontSize: "20px" }}>오늘의,</span>
        <span style={{ fontWeight: "bold", fontSize: "24px" }}>
          우리가 만날 장소는?
        </span>
      </BannerText>

      <InputModal isOpen={open} setOpen={ModalHandler} />

      <ButtonContainer
        style={{ justifyContent: "flex-end", padding: "10px 0px 0px 0px" }}
      >
        <AiFillPlusCircle
          color="#001A5B"
          size={60}
          onClick={ModalHandler}
        ></AiFillPlusCircle>
      </ButtonContainer>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledList>
          {userCtx.users.map((user) => {
            const deleteHandler = () => {
              userCtx.deleteUser(user.id);
            };
            return (
              <StyledItem key={user.id}>
                <div
                  style={{
                    textAlign: "center",
                    width: "70px",
                    overflow: "hidden",
                    padding: "5px 10px 5px 10px",
                    borderRadius: "30px",
                    backgroundColor: "black",
                  }}
                >
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      width: "100%",
                      color: "white",
                      fontSize: "12px",
                    }}
                  >
                    {user.name}
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    width: "150px",
                    overflow: "hidden",
                    padding: "5px 10px 5px 10px",
                    borderRadius: "30px",
                    backgroundColor: "white",
                    borderStyle: "solid",
                  }}
                >
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      width: "100%",
                      color: "black",
                      fontSize: "12px",
                    }}
                  >
                    {user.region}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContents: "center",
                    alignItems: "center",
                    width: "30px",
                    cursor: "pointer",
                  }}
                >
                  <MdDelete
                    color="black"
                    size={22}
                    onClick={deleteHandler}
                  ></MdDelete>
                </div>
              </StyledItem>
            );
          })}
        </StyledList>
      </div>
      <ButtonContainer style={{ position: "fixed", bottom: 0, left: 1 / 2 }}>
        <SearchButton onClick={submitHandler}>중간 찾기</SearchButton>
      </ButtonContainer>
    </RootContainer>
  );
}

export default MainPage;

const RootContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  box-sizing: border-box;
  scroll-behavior: none;
  background-attachment: fixed;
  background-size: cover;
  background-color: #f9f9f9;
  padding: 0px 20px 0px 20px;
`;
const StyledHeader = styled.header`
  display: flex;
  width: 100vw;
  height: 50px;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
`;

const BannerText = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-evenly;
  height: 200px;
  color: black;
  font-weight: semibold;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  @media (min-width: 800px) {
    &:hover {
      opacity: 0.75;
    }
  }
  :active {
    opacity: 0.75;
  }
`;

const SearchButton = styled.button`
  width: 90vw;
  height: 50px;
  background-color: #001a5b;
  color: white;
  border-radius: 10px;
  position: absolute;
  bottom: 10px;
  border-width: 0;
`;

const StyledList = styled.ul`
  display: flex;
  width: 100%;
  padding: 0;
  padding-top: 15px;
  padding-bottom: 15px;
  list-style-type: none;
  flex-direction: column;
  margin-top: 10px;
  overflow: scroll;
  height: 30vh;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 0px #efefef;
`;

const StyledItem = styled.li`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0;
  padding-bottom: 12px;
  justify-content: space-around;
`;
