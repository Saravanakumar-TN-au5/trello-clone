import React from 'react';
import styles from './Header.module.scss';

function Header(props) {
    return (
        <header className={styles['container']}>
            <div className={styles['brand']}>Tello</div>
        </header>
    )
}

export default Header;