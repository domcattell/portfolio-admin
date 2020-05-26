import React, { memo } from 'react';
import styles from '../../styles/admin/UI/dashboard_button.module.scss';

const DashboardButton = (props) => {
	const style = () => {
		const classStyle = props.style;
		switch (classStyle) {
			case 'large':
				return styles.large;

			case 'alternative':
				return styles.alternative;

			default:
				return styles.small;
		}
	};

	return (
		<button onClick={props.onClick} className={style()}>
			{props.children}
		</button>
	);
};

export default memo(DashboardButton);
