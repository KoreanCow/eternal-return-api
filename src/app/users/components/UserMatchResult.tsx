import { forwardRef } from 'react';
import styles from '../[nickname]/nickname.module.scss'

interface UserMatchResultProps {
  isOpen: boolean;
  onClose: () => void;
}

// forwardRef로 감싸서 컴포넌트를 반환
const UserMatchResult = forwardRef<HTMLDivElement, UserMatchResultProps>(
  function UserMatchResult({ isOpen, onClose }, ref) {
    return (
      <div ref={ref} className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <button className={styles.closeBtn} onClick={onClose}>Close</button>
        <h2>Match Results</h2>
      </div>
    );
  }
);

export default UserMatchResult;
