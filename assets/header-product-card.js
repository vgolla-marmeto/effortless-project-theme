class HeaderProductCard extends HTMLElement {
    constructor() {
      super();
  
      this.productHandle = this.dataset.productHandle;
      this.sectionId = this.dataset.sectionId;
      this.addToCart = this.querySelector("#addToCartButton")
      console.log(this.addToCart, this)
      this.addEventListener("submit", (event)=>{
        event.preventDefault();
        this.variantId= this.dataset.variantId
        this.updateCart(this.variantId)
        })
       
     
      if (this.querySelector("script")) {
        this.variantData = JSON.parse(this.querySelector("script").textContent);
      }
      this.addEventListener("change", this.onOptionChange);
    }
    
    onOptionChange() {
     
  
      this.selectedOptions = Array.from(
        this.querySelectorAll('input[type="radio"]:checked'),
        (input) => input.value
      );
      console.log("selectedoption",this.selectedOptions)
      this.currentVariant = this.variantData.find(
        (item) =>
          JSON.stringify(item.options) == JSON.stringify(this.selectedOptions)
      );
      console.log("variantdata", this.variantData);
      console.log("current variant", this.currentVariant);
      this.variantId = this.currentVariant.id 
      console.log(this.variantId)
      this.getUpdatedCard();
    }
    updateCart(variant){
      let formData = {
        'items': [{
         'id': variant,
         'quantity': 1
         }]
       };
       fetch(window.Shopify.routes.root + 'cart/add.js', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(formData)
       })
       .then(response => {
         return response.json();
       })
       .catch((error) => {
         console.error('Error:', error);
       });
      
    }
    
  
    getUpdatedCard() {
      const url = `/products/${this.productHandle}?view=header-product-card&variant=${this.currentVariant.id}`;
      console.log(url);
      fetch(url)
        .then((response) => response.text())
        .then((responseText) => {
          const html = new DOMParser().parseFromString(responseText, "text/html");
          console.log("html",html);
          // this.innerHTML = html.querySelector(
          //   `[data-product-handle="${this.productHandle}"]`
          // ).innerHTML;
          this.innerHTML = html.querySelector('header-product-card').innerHTML;
          console.log(html.querySelector('header-product-card').dataset.variantId)
          this.setAttribute("data-variant-id",html.querySelector('header-product-card').dataset.variantId)
        });
    }
  }
  
  customElements.define("header-product-card", HeaderProductCard);