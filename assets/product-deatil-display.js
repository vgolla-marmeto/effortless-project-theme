let productUrl = document.getElementById("custom-featured-product").dataset.productUrl
    fetch(`${productUrl}/?section_id=template--22573094011154__main`)
    .then((response) => response.text())
          .then((responseText) => {
    const html = new DOMParser().parseFromString(responseText,'text/html');
    
              const container = document.getElementById("custom-featured-product");
            const content = html.querySelector("#MainProduct-template--22573094011154__main")
            console.log(content);
            container.innerHTML = content.innerHTML;
    
    })