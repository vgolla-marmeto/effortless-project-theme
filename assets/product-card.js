class ProductCard extends HTMLElement {
  constructor() {
    super();

    this.productHandle = this.dataset.productHandle;
    this.sectionId = this.dataset.sectionId;
    this.addEvent();
    if (this.querySelector("script")) {
      this.variantData = JSON.parse(this.querySelector("script").textContent);
    }
    this.addEventListener("change", this.onOptionChange);
  }


  addEvent(){
    this.querySelector(".addto-cart-button-style").addEventListener("click", ()=>{
      console.log(this.querySelector('.addto-cart-button-style'))
      this.variantId= this.querySelector(".addto-cart-button-style").dataset.varaint
      console.log(this.variantId)
      this.updateCart(this.variantId)
      
      })
  }
  updateCart(variant){
     console.log(variant)
     let cart=document.querySelector('cart-notification') || document.querySelector('cart-drawer');
    let formData = {
      'items': [{
       'id': variant,
       'quantity': 1
       }],
       "sections": cart.getSectionsToRender().map((section) => section.id)
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
     }).then(response=>
            cart.renderContents(response)
             )
     .catch((error) => {
       console.error('Error:', error);
     })
     
    
  }
  
  onOptionChange() {
   
    this.selectedOptions = Array.from(
      this.querySelectorAll('input[type="radio"]:checked'),
      (input) => input.value
    );
    this.currentVariant = this.variantData.find(
      (item) =>
        (JSON.stringify(item.options) == (JSON.stringify(this.selectedOptions)))
    );
    console.log(this.selectedOptions, this.currentVariant)
    this.getUpdatedCard();
  }
 

  getUpdatedCard() {
    const url = `/products/${this.productHandle}?view=product-card&variant=${this.currentVariant.id}`;
    console.log(url)
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, "text/html");
        console.log(this, html.querySelector('product-card'))
         this.innerHTML = html.querySelector('product-card').innerHTML
         this.addEvent()
      });
  }
}

customElements.define("product-card", ProductCard);