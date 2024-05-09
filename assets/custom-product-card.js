class VeenaProductCard extends HTMLElement {
    constructor() {
      super();
  
      console.log("Product card", this);
  
      this.addEventListener("change", (event) => {
        if (event.target.name == "id") this.variantChange();
      });
    }
  
    variantChange(){
      this.selectedVariantId = this.querySelector('[name="id"]').value;
      let variantUrl = `/products/${this.dataset.handle}?view=custom-product-card&variant=${this.selectedVariantId}`;
       
      //Fetching for new html
      fetch(variantUrl)
        .then((response) => response.text())
        .then((responseText) => {
          const html = new DOMParser().parseFromString(responseText, 'text/html');
          const responseCard = html.querySelector('veena-product-card');
         //Change the DOM Elements
          this.innerHTML = responseCard.innerHTML;
        });
    }
    
  }
  customElements.define("veena-product-card", VeenaProductCard);