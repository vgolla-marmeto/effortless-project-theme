if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLElement {
      constructor() {
        super();
        this.form = this.querySelector('.form');
        console.log(this.form)
        this.form.querySelector('[name=id]').disabled = false;
        this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
        this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        this.submitButton = this.querySelector('[type="submit"]');

        if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');

        this.hideErrors = this.dataset.hideErrors === 'true';
      }

      bundleAddtocart() {
        this.products = []
        document.querySelectorAll('.bundle-checkbox').forEach((element) => {
            if (element.checked == true) {
                this.products.push(element.value)
            }
        })
        return this.products
    }

      onSubmitHandler(evt) {
        evt.preventDefault();
        if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

        this.handleErrorMessage();

        this.submitButton.setAttribute('aria-disabled', true);
        this.submitButton.classList.add('loading');
        this.querySelector('.loading__spinner').classList.remove('hidden');

        const selected = this.bundleAddtocart()

        const checkedItems = selected.map((variantId) =>
          (
              {
                  "id": variantId,
                  "quantity": 1,
                  "properties": {
                    "bundle" : true
                  }
              }
          ))
        let formData
        if(checkedItems !== undefined){
           formData = {
            "items" : [
              {
                id:this.form.querySelector("input[name='id']").value,
                quantity:document.querySelector(`#Quantity-${this.dataset.sectionId}`).value,
                "properties": {
                  "bundle": true
                }
              }, ...checkedItems
            ],
            "sections": this.cart.getSectionsToRender().map((section) => section.id)
          };

        }else{
           formData = {
            "items" : [
              {
                id:this.form.querySelector("input[name='id']").value,
                quantity:document.querySelector(`#Quantity-${this.dataset.sectionId}`).value,
                "properties": {
                  "bundle": flase
                }
              }, ...checkedItems
            ],
            "sections": this.cart.getSectionsToRender().map((section) => section.id)
          };


        }
        
        
        
        fetch(window.Shopify.routes.root + 'cart/add.js', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
          })
          .then((response) => response.json())
          .then((response) => {
            this.cart.renderContents(response);
          }
        )
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            this.submitButton.classList.remove('loading');
            if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
            if (!this.error) this.submitButton.removeAttribute('aria-disabled');
            this.querySelector('.loading__spinner').classList.add('hidden');
          });
      }

      handleErrorMessage(errorMessage = false) {
        if (this.hideErrors) return;

        this.errorMessageWrapper =
          this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) return;
        this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }
    }
  );
}