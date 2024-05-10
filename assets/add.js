let deleteButton = document.getElementById("bundleDelete")

deleteButton.addEventListener("click", function(){
        
        let lineItemContainer = JSON.parse(document.querySelector("#cartLineItems").textContent);
        let cart=document.querySelector('cart-items');
        const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
        let cartVariants = []
        for(let item of lineItemContainer){
          cartVariants.push({"id":item.variant_id,"property":item.properties})
        }
        let BundleItems=[]
        for(let variant of cartVariants){
          if(variant.property.bundle){
            BundleItems.push(variant.id)
          }
        }
        let updates = {}
        BundleItems.forEach(item => {
          updates[item] = 0;
        });
        console.log(updates)
        fetch(window.Shopify.routes.root + 'cart/update.js', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({updates,"sections": cartItems.getSectionsToRender().map((section) => section.id)
        }),
          })
          .then(response => {
          return response.json();
          })
          .then(response=>
          {
              cart.renderContents(response);
              console.log(response)
          })
          .catch((error) => {
          console.error('Error:', error);
          });
      })

  function    getSectionsToRender() {
        return [
          {
            id: 'main-cart-items',
            section: document.getElementById('main-cart-items').dataset.id,
            selector: '.js-contents',
          },
          {
            id: 'cart-icon-bubble',
            section: 'cart-icon-bubble',
            selector: '.shopify-section',
          },
          {
            id: 'cart-live-region-text',
            section: 'cart-live-region-text',
            selector: '.shopify-section',
          },
          {
            id: 'main-cart-footer',
            section: document.getElementById('main-cart-footer').dataset.id,
            selector: '.js-contents',
          },
        ];
      }