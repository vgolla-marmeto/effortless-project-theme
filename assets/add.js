let deleteButton = document.getElementById("bundleDelete")

deleteButton.addEventListener("click", function(){
        
        let divContainer = JSON.parse(document.querySelector("#cartLineItems").textContent);
        console.log(divContainer)
        let cart=document.querySelector('cart-items');
        console.log(cart)
        let cartVariants = []
        for(let item of divContainer){
          cartVariants.push({"id":item.variant_id,"property":item.properties})
        }
        console.log(cartVariants)
        let withBundels=[]
        for(let variant of cartVariants){
            console.log(variant.property.bundle)
          if(variant.property.bundle){
            withBundels.push(variant.id)
          }
        }
        console.log(withBundels)
        let updates = {}
        withBundels.forEach(item => {
          updates[item] = 0;
        });
        fetch(window.Shopify.routes.root + 'cart/update.js', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({updates}),
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