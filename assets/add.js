let deleteButton = document.getElementById("bundleDelete")

deleteButton.addEventListener("click", function(){
        
        let lineItemContainer = JSON.parse(document.querySelector("#cartLineItems").textContent);
        let cart=document.querySelector('cart-items');
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
          body: JSON.stringify({updates,"sections": cart.getSectionsToRender().map((section) => section.id)
        }),
          })
          .then(response => {
          return response.json();
          })
          .then(response=>
          {
              cart.renderContent(response);
              console.log(response)
          })
          .catch((error) => {
          console.error('Error:', error);
          });
      })