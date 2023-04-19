export function GetAddressList(searchPlace, setList) {
  window.kakao.maps.load(() => {
    var ps = new window.kakao.maps.services.Places();
    const searchPlaces = () => {
      var keyword = searchPlace;
      if (!keyword) {
        alert("키워드를 입력해주세요!");
        return false;
      }
      ps.keywordSearch(keyword, placesSearchCB);
    };

    const placesSearchCB = (data, status, pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        data.map((place, index) => {
          if (index < 5) {
            setList((list) => [...list, place]);
          }
        });
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    };

    searchPlaces();
  });
}


export function searchPath(id){
    window.kakao.maps.load(() => {
        const url = `https://map.kakao.com/link/to/${id}`;
    })
}