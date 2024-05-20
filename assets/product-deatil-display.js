let productUrl = document.getElementById("custom-featured-product").dataset.productUrl
console.log(`${productUrl}?section_id=template--22732303794450__main`)
    fetch(`${productUrl}?section_id=template--22732303794450__main`)
    .then((response) => response.text())
          .then((responseText) => {
    const html = new DOMParser().parseFromString(responseText,'text/html');
    console.log(html)
              const container = document.getElementById("custom-featured-product");
              console.log(container)
            const content = html.querySelector(".main-product-page")
            container.innerHTML = content.innerHTML;
    
    })