import { useState } from 'react';

const useInputState = (init) => {
	const [ newValue, setValue ] = useState(init);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValue((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleQuillChange = (value) => {
		setValue((prev) => ({
			...prev,
			description: value
		}));
	};

	const handleFileChange = (e) => {
		e.persist();
		setValue((prev) => ({
			...prev,
			projectImg: e.target.files[0]
		}));
	};

	const reset = (init) => {
		setValue(init);
	};


	return [ newValue, handleChange, handleQuillChange, handleFileChange, reset ];
};

export default useInputState;
