import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles/recommend.module.css'; // CSS 모듈을 불러옵니다.
import Modal from './Modal'; // Modal 컴포넌트를 불러옵니다.

type Destination = {
  id: number;
  features: string;
  description: string;
  imageUrl: string;
  name: string;
  averageRating: number;
};

function Recommend() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [userInfo, setUserInfo] = useState<any>(null); // 사용자 정보를 저장할 상태
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  useEffect(() => {
    // 백엔드 API에서 여행지 목록을 가져옵니다.
    axios.get('/api/destinations')
      .then(response => {
        setDestinations(response.data);
      })
      .catch(error => {
        console.error("여행지 목록을 가져오는 중 오류 발생:", error);
      });

    // JWT 토큰이 존재할 때만 사용자 정보를 가져오도록 함
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      fetchUserInfo(); // 회원 정보를 가져오는 함수 호출
    }
  }, []); // 빈 배열을 두어 한 번만 실행되도록 설정

  // 사용자 정보를 가져오는 함수
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/userinfo', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}` // JWT 토큰을 헤더에 추가
        },
      });

      if (response.status === 200) {
        console.log("회원 정보:", response.data);
        setUserInfo(response.data); // 사용자 정보를 상태에 저장
      }
    } catch (error) {
      console.error("회원 정보 가져오기 실패:", error);
    }
  };

  // 여행지를 클릭할 때 해당 여행지 정보를 선택하도록 설정
  const handleImageClick = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  // 선택된 여행지 정보를 닫는 함수
  const closeSelectedDestination = () => {
    setSelectedDestination(null);
  };

  return (
    <div>
      {userInfo && (
        <div>
          <p>로그인한 사용자: {userInfo.userid}</p>
          {/* 다른 사용자 정보 표시 */}
        </div>
      )}

      {destinations.map(destination => (
        <div key={destination.id} className={styles['destination-card']}>
          <div className={styles['destination-card-header']} onClick={() => handleImageClick(destination)}>
            <img
              src={destination.imageUrl}
              alt={destination.name}
              className={styles['destination-image']}
            />
            <h2 className={styles['destination-name']}>{destination.name}</h2>
          </div>
        </div>
      ))}

      {/* 선택된 여행지 정보가 있을 때 모달을 렌더링합니다. */}
      {selectedDestination && (
        <Modal destination={selectedDestination} onClose={closeSelectedDestination} />
      )}
    </div>
  );
}

export default Recommend;


