let productUrl = document.getElementById("custom-featured-product").dataset.productUrl
fetch(productUrl).then((response) => response.text())
          .then((responseText) => {
            const responseHTML = new DOMParser().parseFromString(responseText, 'text/html');
            const productElement = responseHTML.querySelector('section[id^="MainProduct-"]');
            const  container = document.getElementById("custom-featured-product")
            console.log(container , productUrl, productElement)
            if(productElement && container ){
                  container.innerHTML = productElement.innerHTML
                  if (window.Shopify && Shopify.PaymentButton) {
                        Shopify.PaymentButton.init();
                      }
                      
                  if (window.ProductModel) window.ProductModel.loadShopifyXR();
                   container.querySelectorAll('script').forEach((oldScriptTag) => {
                        const newScriptTag = document.createElement('script');
                        Array.from(oldScriptTag.attributes).forEach((attribute) => {
                          newScriptTag.setAttribute(attribute.name, attribute.value);
                        });
                        newScriptTag.appendChild(document.createTextNode(oldScriptTag.innerHTML));
                        oldScriptTag.parentNode.replaceChild(newScriptTag, oldScriptTag);
                      });
                      const variantPicker = container.querySelector('variant-selects');
                      if (!variantPicker){
                        return;
                      }
                     variantPicker.setAttribute('data-update-url', 'false');
            
                  
            }
          })



// console.log(`${productUrl}?section_id=template--22732303794450__main`)
//     fetch(`${productUrl}?section_id=template--22732303794450__main`)
//     .then((response) => response.text())
//           .then((responseText) => {
//     const html = new DOMParser().parseFromString(responseText,'text/html');
//     console.log(html)
             
//               console.log(container)
//             const content = html.querySelector(".main-product-page")
//             container.innerHTML = content.innerHTML;
    
//     })




