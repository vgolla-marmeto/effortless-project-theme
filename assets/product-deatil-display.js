let productUrl = document.getElementById("custom-featured-product").dataset.productUrl
console.log(`${productUrl}?section_id=template--22732303794450__main`)
    fetch(`${productUrl}?sections=main-product`)
    .then((response) => response.json())
          .then((responseText) => {
            console.log(responseText)
    const html = new DOMParser().parseFromString(responseText["main-product"],'text/html');
           console.log(html.querySelector('.shopify-section'))
              const container = document.getElementById("custom-featured-product")
            container.innerHTML = html.querySelector('.shopify-section').innerHTML;
    
    })