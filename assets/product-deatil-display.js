let productUrl = document.getElementById("custom-featured-product").dataset.productUrl
console.log(`${productUrl}?section_id=template--22732303794450__main`)
    fetch(`${productUrl}?section_id=template--22675927531794__main`)
    .then((response) => response.text())
          .then((responseText) => {
            console.log(responseText)
    const html = new DOMParser().parseFromString(responseText,'text/html');
              const container = document.getElementById("custom-featured-product")
            container.innerHTML = html.querySelector(".main-product-page").innerHTML;
    
    })