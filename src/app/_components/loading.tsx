'use client';

import { useEffect, useState } from 'react';
import styles from './loading.module.scss';

export default function Loading({ onComplete }: { onComplete: () => void }) {
  const [isClosing, setIsClosing] = useState(false); // 문 닫힘 상태

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true); // 닫힘 애니메이션 시작
      setTimeout(onComplete, 0); // 애니메이션 완료 후 onComplete 호출
    }, 100); // 로딩 시간
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={styles['loading-overlay']}>
      {/* 왼쪽 패널 */}
      <div
        className={`${styles.panel} ${styles['panel-left']} ${
          isClosing ? styles.close : ''
        }`}
      ></div>
      {/* 오른쪽 패널 */}
      <div
        className={`${styles.panel} ${styles['panel-right']} ${
          isClosing ? styles.close : ''
        }`}
      ></div>
      {/* 로딩 텍스트 */}
      {!isClosing && (
        <p className={`${styles['loading-text']}`}>Wait Please..</p>
      )}
    </div>
  );
}
