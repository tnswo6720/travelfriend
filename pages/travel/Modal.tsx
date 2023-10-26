import styles from './styles/recommend.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

type ModalProps = {
  destination: Destination;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ destination, onClose }) => {
  const [isImageZoomed, setImageZoomed] = useState(false);
  const [isImageClicked, setImageClicked] = useState(false);


  useEffect(() => {
    // 모달이 열릴 때 startTime 설정
    const startTime = Date.now();
    // setStartTime(startTime);
    console.log(startTime);

    return () => {
      const closeTime = Date.now();
      // 모달이 닫힐 때 API 호출
      sendActivityData(startTime, closeTime);
      console.log(closeTime);
    };
  }, []);


  const handleImageClick = () => {
    setImageClicked(true);
    setImageZoomed(!isImageZoomed);
  };

  useEffect(() => {
    console.log(isImageClicked); // 클릭 후에 변경된 값 확인 가능
  }, [isImageClicked]);
  const sendActivityData = async (startTime: number, closeTime: number) => {
    // API로 전송할 데이터
    const activityData = {
      photoClicked: isImageClicked,
      startTime: startTime,
      endTime: closeTime,
      destination: destination,
      // 기타 필요한 데이터 추가
    };

    try {
      const response = await axios.post('http://localhost:8080/api/activities/collect', activityData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.status === 200) {
        console.log('활동 데이터가 성공적으로 저장되었습니다.');
      }
    } catch (error) {
      console.error('활동 데이터 저장 중 오류 발생:', error);
    }
  };

  const descriptionObject = JSON.parse(destination.feature);
  const featuresArray = descriptionObject.특성;

  return (
    <div className={styles['modal-overlay']} onClick={onClose}>
      <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
        <div className={styles['modal-image-container']}>
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className={`${styles['modal-image']} ${isImageZoomed ? styles['zoomed'] : ''}`}
            onClick={handleImageClick}
          />
        </div>
        <div className={styles['modal-details']}>
          <h2 className={styles['destination-name']}>{destination.name}</h2>
          <div className={styles['modal-description']}>
            {featuresArray.map((feature, index) => (
              <span key={index} className={styles['hashtag']}>
                #{feature}
              </span>
            ))}
          </div>
          <p className={styles['modal-features']}>{destination.features}</p>
          <p className={styles['modal-rating']}>Rating: {destination.averageRating}</p>
        </div>
        <button className={styles['modal-close-button']} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
