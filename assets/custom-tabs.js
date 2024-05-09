class CustomTabs extends HTMLElement {
    constructor() {
      super();
      this.element = this;
      console.log(this);
      this.checkActiveTag();
    }
  
    displayText(el) {
        console.log("dis")
        console.log(el)
      let alltabs = document.querySelectorAll(".collection-tabs");
  
      alltabs.forEach((eachTab) =>{
        console.log(eachTab)
        if(eachTab === el){
            console.log(eachTab)
            console.log(el)
            eachTab.classList.add("active")
        }
      })
    }
  
    checkActiveTag() {
      let alltabs = this.querySelectorAll(".collection-tabs");
  
      alltabs.forEach((eachTab) => eachTab.addEventListener("click", ()=> {
        this.path = eachTab.dataset.path;
        this.sectionId = eachTab.dataset.sectionId;
        // this.renderPage()
  
        fetch(`${this.path}?section_id=${this.sectionId}`)
          .then(response => response.text())
          .then((responseText) => { // Changed to arrow function
            const html = new DOMParser().parseFromString(responseText, 'text/html');
            const container = document.getElementById("product-grid-container");
            const content = html.querySelector("body");
            console.log(content);
            container.innerHTML = content.innerHTML;
            window.history.replaceState({}, '', this.path); // 'this' refers to CustomTabs instance
            console.log("hello");
            setTimeout(() => {
                this.displayText(eachTab); // Call the displayText method using 'this'
            }, 5000);
          });
      }));
    }
  }
  
  customElements.define("custom-tabs", CustomTabs);
  