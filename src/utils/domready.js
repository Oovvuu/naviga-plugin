export default function domReady( callback ) {
    if (
        document.readyState === 'complete' || // DOMContentLoaded + Images/Styles/etc loaded, so we call directly.
		document.readyState === 'interactive' // DOMContentLoaded fires at this point, so we call directly.
    ) {
        return callback();
    }

    // DOMContentLoaded has not fired yet, delay callback until then.
    document.addEventListener( 'DOMContentLoaded', callback );
}
