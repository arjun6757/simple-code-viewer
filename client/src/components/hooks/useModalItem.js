import { useState, useRef, useEffect } from "react";

export default function useModalItem() {
	const [focusIndex, setFocusIndex] = useState(0);
	const [selectIndex, setSelectIndex] = useState(0);

	const ModalItemRefs = useRef([]);

	useEffect(() => {
		//remove previous selected classes if any
		ModalItemRefs.current.forEach((item) => {
			item.classList.remove("selected");
		});

		if (ModalItemRefs.current[selectIndex]) {
			ModalItemRefs.current[selectIndex].classList.add("selected");
			console.log(selectIndex);
		}
	}, [selectIndex]);

	// useEffect(() => {
	// 	if (ModalItemRefs.current[focusIndex]) {
	// 		ModalItemRefs.current[focusIndex].focus();
	// 	}
	// }, [focusIndex]); //whenever focusIndex changes

	return {
		focusIndex,
		setFocusIndex,
		ModalItemRefs,
		setSelectIndex,
	};
}
