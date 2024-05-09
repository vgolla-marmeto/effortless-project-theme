class customComponent extends HTMLElement{
  constructor(){
    super()
    this.element = this
    console.log(this.element)
    this.addEventListener("change", (event) => {
        if (event.target.name == "options-change") this.variantChange();
      });
  }
  variantChange(){
     this.selectedVariantId = this.querySelector('[name="options-change"]').value
     let dataUrl = `products/${this.dataset.handle}?view="practice-product-card"&variant=${this.selectedVariantId}`
     fetch(dataUrl).then((response) => response.text()).then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html');
        const responseCard = html.querySelector('custom-product-card');
        console.log(responseCard)
        this.innerHTML = responseCard.innerHTML;
   
     })
  }

}

customElements.define("custom-product-card", customComponent)