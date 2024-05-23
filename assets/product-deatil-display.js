let productUrl = document.getElementById("custom-featured-product").dataset.productUrl
fetch(productUrl).then((response) => response.text())
          .then((responseText) => {
            const responseHTML = new DOMParser().parseFromString(responseText, 'text/html');
            const productElement = responseHTML.querySelector('section[id^="MainProduct-"]');
            const  container = document.getElementById("custom-featured-product")
            if(productElement && container ){
                  container.innerHTML == productElement.innerHTML
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




