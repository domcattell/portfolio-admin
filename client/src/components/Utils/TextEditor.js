import React from 'react';
//only load Quill on client side. depends on document, if not present on SSR then will not load
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

const TextEditor = (props) => {
	const modules = {
		toolbar: [
			[ { header: [ 1, 2, 3, 4, 5, false ] } ],
			[ 'bold', 'italic', 'underline', 'code-block' ],
			[ { list: 'ordered' }, { list: 'bullet' } ],
			[ 'link' ],
			[ 'clean' ]
		]
	};

	const formats = [ 'header', 'bold', 'italic', 'underline', 'code-block', 'list', 'bullet', 'indent', 'link' ];

	return (
		<div className="text-editor">
			<ReactQuill
				theme="snow"
				modules={modules}
				formats={formats}
				value={props.value}
				onChange={props.onChange}
				placeholder="Enter description..."
			/>
		</div>
	);
};

export default TextEditor;
