export const ShareKakao = (route, goal,startPlaces) => { // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
    
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAOMAP_KEY); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
      }
      var descript = ``;
      if(startPlaces.length<3){
      startPlaces.map((place) => descript+=`${place.region}\n`)
    }
      
      const imageSrc = 'https://ifh.cc/g/6gdHDd.jpg'; //도메인 src만 쓸 수 있음
      
      kakao.Link.sendDefault({
        objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
        content: {
          title: '우리 지금 중간에서 만나요!', // 인자값으로 받은 title
          description: `${descript}\n 우리가 만날 장소는 ${goal}`, // 인자값으로 받은 title
          imageUrl: imageSrc,
          link: {
            mobileWebUrl: route, // 인자값으로 받은 route(uri 형태)
            webUrl: route
          }
        },
        buttons: [
          {
            title: goal,
            link: {
              mobileWebUrl: route,
              webUrl: route
            }
          }
        ]
      });
    }
  };