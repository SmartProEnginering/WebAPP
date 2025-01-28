document.querySelector('.navbar-toggler').addEventListener('click', function(){
    const collapseElement = document.querySelector('#navbarSupportedContent');
    const collapseInstance = new Collapse(collapseElement, {toggle: true});
    collapseInstance.toggle();
});

class Collapse {
    constructor(element, config) {
        this._element = element;
        this._config = config;
        this._isTransitioning = false;

        if (this._config.toggle) {
            this.toggle();
        }
    }

    // Show the element
    show() {
        if (this._isTransitioning || this._element.classList.contains('show')) {
            return;
        }
        this._element.classList.remove('collapse');
        this._element.classList.add('collapsing');
        this._element.style.height = 0;

        this._isTransitioning = true;
        const complete = () => {
            this._isTransitioning = false;
            this._element.classList.remove('collapsing');
            this._element.classList.add('collapse', 'show');
            this._element.style.height = '';
        };

        setTimeout(complete, 350); // Transition duration
        this._element.style.height = `${this._element.scrollHeight}px`;
    }

    // Hide the element
    hide () {
        if (this._isTransitioning || !this._element.classList.contains('show')) {
            return;
        }
        // Start height fix
        this._element.style.height = `${this._element.getBoundingClientRect().height}px`;
        reflow(this._element);
        this._element.classList.add('collapsing');
        this._element.classList.remove('collapse', 'show');
        this._isTransitioning = true;

        // Reset height to trigger transition
        const complete = () => {
            this._isTransitioning = false;
            this._element.classList.remove('collapsing');
            this._element.classList.add('collapse');
            this._element.style.height = '';
        };

        // Using next frame to reset height for transition
        requestAnimationFrame(() => {
            this._element.style.height = ''
        })

        // End of transition
        setTimeout(complete, 350);
    }

    // Toggle the visibility of the element
    toggle() {
        if (this._element.classList.contains('show')) {
            this.hide();
        }
        else {
            this.show();
        }
    }
}

// Utility function to force reflow
function reflow(element) {
    return element.offsetHeight;
}