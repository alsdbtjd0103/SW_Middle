/*global kakao*/
import ReactModal from "react-modal";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../store/UserContext";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsSearch } from "react-icons/bs";
import { GetAddressList } from "../util/Map_Util";

ReactModal.setAppElement("#root");

function InputModal({ isOpen, setOpen }) {
  const userCtx = useContext(UserContext);
  const [defaultName, setDefaultName] = useState("user" + userCtx.getNextId());
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [info, setInfo] = useState({});
  const [regionList, setRegionList] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    if (region) {
      if (!name) {
        setName(defaultName);
      }
      submitHandler();
    }
  }, [isSelected]);

  useEffect(() => {
    setDefaultName("user" + userCtx.getNextId());
  }, [isOpen]);

  const addUser = async () => {
    const nextId = userCtx.getNextId();
    userCtx.addUser(nextId, name, region, info);
  };

  const reset = () => {
    setName("");
    setRegion("");
    setOpen((previous) => !previous);
    setRegionList([]);
    setIsSelected(false);
  };

  const submitHandler = async () => {
    if (region) {
      if (!name) {
        setName(defaultName);
      }

      await addUser();
      reset();
    } else {
      return;
    }
  };

  const searchHandler = () => {
    setRegionList([]);
    GetAddressList(region, setRegionList);
  };

  return (
    <ReactModal
      onRequestClose={reset}
      isOpen={isOpen}
      style={{
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          width: "80%",
          borderWidth: 1,
          flexDirection: "column",
          height: "min-content",
          padding: 0,
        },
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(108, 105, 108,0.75)",
        },
      }}
    >
      <form style={{ padding: "20px 20px 0px 20px" }}>
        <StyledLabel>
          이름
          <StyledInput
            type={"text"}
            onChange={(e) => setName((previous) => e.target.value)}
            value={name}
            placeholder={defaultName}
          ></StyledInput>
        </StyledLabel>
        <StyledLabel>
          지역
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 0,
              margin: 0,
            }}
          >
            <StyledInput
              type={"text"}
              onChange={(e) => setRegion((previous) => e.target.value)}
              value={region}
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  searchHandler();
                }
              }}
            ></StyledInput>
            <StyledBsSearch
              style={{ cursor: "pointer" }}
              onClick={searchHandler}
            >
              <BsSearch style={{}} size={15} />
            </StyledBsSearch>
          </div>
        </StyledLabel>
      </form>
      <StyledList>
        {regionList.map((place, index) => {
          return (
            <StyledLi
              key={index}
              onClick={async () => {
                const setting = async () => {
                  setRegion(place.place_name);
                  setInfo(place);
                  if (!name) {
                    setName(defaultName);
                  }
                };
                await setting();

                setIsSelected(true);
              }}
            >
              <StyledItem>
                <span style={{ fontSize: "15px" }}>{place.place_name}</span>
                <span style={{ fontSize: "13px" }}>{place.address_name}</span>
              </StyledItem>
            </StyledLi>
          );
        })}
      </StyledList>
    </ReactModal>
  );
}

export default InputModal;

const StyledInput = styled.input`
  height: 28px;
  border-width: 0px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: #b8f2f7;
  padding-bottom: 5px;
  margin-top: 10px;
  font-size: 15px;
  outline: none;
  width: 90%;
`;

const StyledLabel = styled.label`
  display: flex;
  font-size: 13px;
  flex-direction: column;
  color: gray;
  height: 70px;
`;

const StyledBsSearch = styled.div`
  position: relative;
  right: 5%;
  top: 7px;
  border-style: none;
  width: 50px;
  height: 30px;
  text-align: center;
`;

const StyledList = styled.ul`
  width: 100%;
  position: relative;
  padding: 0;
  list-style-type: none;
  max-height: 150px;
  overflow: scroll;
  :hover {
  }
`;

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  transition: all 0.5ms;
`;

const StyledLi = styled.li`
  width: "100%";
  padding: 0px 20px 10px 20px;
  cursor: pointer;
  :hover {
    -webkit-tap-highlight-color: rgba(108, 105, 108, 0.75);
  }
`;
