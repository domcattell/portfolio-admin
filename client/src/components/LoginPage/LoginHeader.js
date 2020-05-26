import React from 'react';
import styles from '../../styles/admin/login_page/login_header.module.scss'

const LoginHeader = (props) => {
	return (
		<div className={styles.login_page__header_container}>
			<h5 className={styles.login_page__header}>
				{props.text}
				<span className={styles.login_page__sub_heading}>Login</span>
			</h5>
		</div>
	);
};

export default LoginHeader;
