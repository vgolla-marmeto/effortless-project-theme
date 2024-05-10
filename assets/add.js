let deleteButton = document.getElementById("bundleDelete")

deleteButton.addEventListener("click", function(){
        
        let divContainer = JSON.parse(document.querySelector("#cartLineItems").textContent);
        console.log(divContainer)
        let cartVariants = []
        for(item of divContainer){
          cartVariants.push({"id":item.variant_id,"property":item.properties})
        }
        let withBundels=[]
        for(variant of cartVariants){
          if(variant.property.bundel){
            withBundels.push(variant.id)
          }
        }
        let updates = {}
        withBundels.forEach(item => {
          updates[item] = 0;
        });
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
              cart.renderContents(response);
              console.log(response)
          })
          .catch((error) => {
          console.error('Error:', error);
          });
      })