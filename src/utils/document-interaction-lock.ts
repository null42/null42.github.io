let bodyScrollLockCount = 0;
let previousBodyOverflow = "";

export function acquireBodyScrollLock(): () => void {
	if (bodyScrollLockCount === 0) {
		previousBodyOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
	}
	bodyScrollLockCount += 1;
	let released = false;

	return () => {
		if (released) return;
		released = true;
		bodyScrollLockCount = Math.max(0, bodyScrollLockCount - 1);
		if (bodyScrollLockCount === 0) {
			document.body.style.overflow = previousBodyOverflow;
			previousBodyOverflow = "";
		}
	};
}
