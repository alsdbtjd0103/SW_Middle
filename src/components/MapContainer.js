import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

import { UserContext } from "../store/UserContext";

import { Average_Algorithm } from "../util/Mid_Algorithm";

import axios from'axios';

import styled from "styled-components";
import InformationSlider from "./InformationSlider";
import { MdPassword } from "react-icons/md";

export default function MapContainer() {
  const userCtx = useContext(UserContext);
  const [placeCount, setPlaceCount] = useState(10); //표시할 장소의 최대 개수
  const [placeIndex, setPlaceIndex] = useState(0);
  const [placeList, setPlaceList] = useState([]);
  const [kakaoMap, setKakaoMap] = useState(null);
  const [NoPlace, setNoPlace] = useState(false);
  const [tempuser, settempuser] = useState([]);
  const [polylines,setPolylines] = useState([]);
  const [placeOverlay,setPlaceOverlay ] = useState();
  
  const [radius, setRadius] = useState(2000); //중간좌표로부터의 장소를 검색할 반경 거리 m -> 촤대 10000m로 설정

  const markerColor = {
    0: "F56BFF",
    1: "FF6E6E",
    2: "6B6BFF",
    3: "6BFF77",
    4: "6BC4FF",
    5: "FFF56B",
    6: "FFAE6B",
    7: "6BFFCB",
    8: "EB1E55",
  };
  var userList = [];
  const RegionCode = {
    subway: "SW8",
  };

  function MapSetting() {
    //Map 생성
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("kakaoMap");
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      var map = new window.kakao.maps.Map(mapContainer, mapOption);
      setKakaoMap(map);
    });
  }

  function getPlaceList() {
    window.kakao.maps.load(() => {
      userCtx.users.map((user) => {
        userList.push({
          name: user.name,
          region: user.region,
          latlng: new window.kakao.maps.LatLng(user.info.y, user.info.x),
          info: user.info,
          content: `<div style="font-color:black;border-radius:10px;opacity:0.8;font-size:10px;background-color:white;width:50px;padding:5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">${user.name}</div>`,
        });
      });

      settempuser((previous) => [...userList]);

      async function getCenter() {
        //center 주위의 place 구하기
        // user들의 좌표를 이용해서 중간점의 좌표를 구함
        window.kakao.maps.load(() => {});
        var userCoords = [];
        userCtx.users.map((user) => {
          const x = parseFloat(user.info.x);
          const y = parseFloat(user.info.y);
          userCoords.push([y, x]);
        });
        var centerCoord = await Average_Algorithm(userCoords);

        const coord = new window.kakao.maps.LatLng(
          centerCoord.x,
          centerCoord.y
        );

        CoordToPlace(RegionCode.subway);

        function CoordToPlace(code) {
          //좌표를 이용해서 그 좌표 주위 장소를 구함
          var ps = new window.kakao.maps.services.Places();
          ps.categorySearch(code, placesSearchCB, {
            radius: radius,
            location: coord,
            sort: window.kakao.maps.services.SortBy.DISTANCE,
          });
          console.log(ps)

          // 키워드 검색 완료 시 호출되는 콜백함수 입니다

          function placesSearchCB(data, status, pagination) {
            if (status === window.kakao.maps.services.Status.OK) {
              let datas = [];
              for (var i = 0; i < data.length; i++) {
                if (i < placeCount) {
                  datas.push(data[i]);
                  setPlaceList(() => datas);
                }
              }
            } else {
              console.log("addresstoplace error", status);
              if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                // setNoPlace(true);
                // console.log("No Place");
                
                if (radius > 10000) {
                  console.log("중간 지점 장소가 없습니다.");
                }
                setRadius((previous) => previous + 1000);
              }
            }
          }
          return;
        }
      }
      getCenter();

      const putUserMarker = () => {
        var bounds = new window.kakao.maps.LatLngBounds();
        for (var i = 0; i < userList.length; i++) {
          var imageSrc = `image/marker_${markerColor[i]}.png`, // 마커이미지의 주소입니다
            imageSize = new window.kakao.maps.Size(48, 49), // 마커이미지의 크기입니다
            imageOption = { offset: new window.kakao.maps.Point(26, 40) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
          var markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );

          // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다

          var marker = new window.kakao.maps.Marker({
            position: userList[i].latlng,
            image: markerImage,
          });
          marker.setMap(kakaoMap);

          //오버레이 추가
          // var overlay = new window.kakao.maps.CustomOverlay({
          //   content: userList[i].content,
          //   map: kakaoMap,
          //   position: userList[i].latlng,
          // });
          // overlay.setMap(kakaoMap);

          // LatLngBounds 객체에 좌표를 추가합니다
          bounds.extend(userList[i].latlng);
        }
        kakaoMap.setBounds(bounds);
        const level = kakaoMap.getLevel();
        kakaoMap.setLevel(level);
      };
      putUserMarker();
    });
  }

  function drawingPath(index) {
    window.kakao.maps.load(() => {
    
      var placeLatlng = new window.kakao.maps.LatLng(
        placeList[index].y,
        placeList[index].x
      );
      var polys = [];
      for (var i = 0; i < tempuser.length; i++) {

        var strokeColor = `#${markerColor[i]}`;
        var polyline = new window.kakao.maps.Polyline({
          map: kakaoMap,
          path: [tempuser[i].latlng, placeLatlng],
          strokeWeight: 3,
          strokeColor: strokeColor,
          strokeOpacity: 0.8,
          strokeStyle: "solid",
        });
        
        polys.push(polyline);
      }
      setPolylines((lines) => {
        if(lines.length>0){
          lines.map((line) => {
            line.setMap(null);
          })
        }
        return polys;
      });
 

    });
  }

  function putPlaceMarker(placeIndex) {
    
    window.kakao.maps.load(() => {
      for (var i = 0; i < placeList.length; i++) {
        // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
        if(i!==placeIndex){
          continue
        }
        var latlng = new window.kakao.maps.LatLng(
          placeList[i].y,
          placeList[i].x
        );
        
        var overlay = new window.kakao.maps.CustomOverlay({
          content: `<a style="text-decoration:none;color:black;cursor:pointer;" href=${'https://map.kakao.com/link/to/'+placeList[i].id}><div style="display:flex;font-color:black;border-radius:10px;font-size:12px;background-color:white;padding:5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;border-style:solid;border-color:orange">${placeList[i].place_name}</div></a>`,
          map: kakaoMap,
          position: latlng,
        });
        if (placeOverlay){
          placeOverlay.setMap(null);
        }
        
        setPlaceOverlay(() => overlay);

        // // LatLngBounds 객체에 좌표를 추가합니다
      }
    });
  }

  useEffect(() => {
    MapSetting();
  }, []);

  useEffect(() => {
    if (kakaoMap) {
      getPlaceList();
    }
  }, [kakaoMap, radius]);

  useEffect(() => {
    if (NoPlace) {
      alert("일정 범위 내 위치한 역이 없습니다!");
    }
  }, [NoPlace]);

  useEffect(() => {
    if (placeList.length > 0) {
      putPlaceMarker(placeIndex);
    }
  }, [placeList,placeIndex]);

  useEffect(() => {
    if (placeList.length > 0 && tempuser.length > 0) {
      drawingPath(placeIndex);
    }
  }, [tempuser, placeList, placeIndex]);

  useEffect(()=> {
    if(polylines.length>0&&kakaoMap){
      polylines.map((line) => line.setMap(kakaoMap))
    }
  },[polylines])

  useEffect(() => {
    if(placeOverlay){
      placeOverlay.setMap(kakaoMap);
    }
  },[placeOverlay])



  async function findApi(){
    console.log('axios start')
    const response = await axios.post('http://localhost:4000/api/path',{
      start:tempuser[0].info,
      end:placeList[0],
    })
    console.log('axios end',response.data);

  }

  return (
    <StyledContainer>
      {/* <div
        style={{
          borderStyle: "solid",
          width: "100px",
          height: "100px",
          zIndex: "999",
          backgroundColor: "black",
        }}
        onClick={findApi}
      >
        <span style={{color:'white'}}>찾기</span>
      </div> */}
      <div
        id="kakaoMap"
        style={{
          width: '95vw',
          height: "65vh",
          borderRadius:'20px',
          zIndex:1,
          
        }}
      ></div>
      <div style={{
        width:'95vw',
        height:'35vh',
        marginTop:'20px',
        marginBottom:'50px',
        
      }}>
        <InformationSlider placeList={placeList} setPlaceIndex={setPlaceIndex} polylines={polylines}/>
        
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  width:100%;
  height:100%;

  align-items: center;
  flex-direction: column;
`
