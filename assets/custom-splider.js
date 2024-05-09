if (!customElements.get("splider-component")) {
    class CustomSlider extends HTMLElement {
        constructor() {
          super();
          this.element = this;
          this.options = JSON.parse(this.element.dataset.sliderOptions);
          this.mountSplider()
        }
      
        mountSplider() {
          new Splide(this.element,this.options).mount();
        }
      }
      
      customElements.define("splider-component", CustomSlider);
}