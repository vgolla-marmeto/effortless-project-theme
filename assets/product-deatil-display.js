let productUrl = document.getElementById("custom-featured-product").dataset.productUrl
console.log(`${productUrl}?section_id=template--22732303794450__main`)
let mainProductId = document.querySelector('main-product-page')
console.log(mainProductId)
console.log({mainProductId})
    fetch(`${productUrl}?sections=main-product`)
    .then((response) => response.text())
          .then((responseText) => {
    const html = new DOMParser().parseFromString(responseText,'text/html');
    console.log(html)
              const container = document.getElementById("custom-featured-product");
              console.log(container)
            const content = html.querySelector(".main-product-page")
            console.log(content)
            container.innerHTML = content.innerHTML;
    
    })