Vue.config.devtools = true

Vue.component('product',{

props : {
     premium : {
      type : Boolean,
      required : true  
    }
},
  template : `
<div class="product">
<div class="product-image">
<img :src="image">
</div>
<div class="product-info">
<h1>{{ title }}</h1>
<p v-if="inventory > 10 ">In Stock</p>
<p v-else-if="inventory<=10 && inventory>0">Almost finishing...</p>
<p v-else>Out of Stock</p>
<p>Shipping : {{ shipping  }}</p>
<ul>
<li v-for="detail in details">{{detail}}</li>
</ul>
<ul>
<div v-for="(variant,index) in variants" :key="variant.variantID" class="color-box"
:style="{backgroundColor : variant.variantColor}" @mouseover="updateProduct(index)" >
</div>
</ul>
<button v-on:click="addToCart" :disabled="!inventory" :class="{disabledButton : !inventory}">Add to Cart</button>
</div>
<product-review @review-submitted="addReview"></product-review>
<div>
<h2>Reviews</h2>
<p v-if="!reviews.length">There are no Reviews yet</p>
<ul>
<li v-for="review in reviews">
<p>{{review.name}}</p>
<p>{{review.rating}}</p>
<p>{{review.review}}</p>
</li>
</ul>
</div>
</div>
    `,
    data(){
        return {
            brand : 'Vue Mastery',  
            product: 'Socks',
            selectedVariant : 0,
            details:['80% Cotton' , '100% polyester' , '90% wool'],
            variants : [
              {
                  variantID : 2234,
                  variantColor : 'green',
                  variantimage : './assets/green_socks.png',
                  variantQuantity : 90,
              },
              {
                  variantID : 2235,
                  variantColor : 'blue',
                  variantimage : './assets/blue_socks.png',
                  variantQuantity : 0,
              }
            ],
            reviews:[]
        }
    },
    methods : {
              addToCart : function(){
      
            this.$emit('add-to-cart',this.variants[this.selectedVariant].variantID);
      
              },
              updateProduct : function(index){
                  this.selectedVariant = index;
      
              },
              addReview(productReview){
                
                this.reviews.push(productReview);
                

              }
          },
          computed : {
           title(){
              return this.brand + " "+ this.product;
           },   
           image(){
               return this.variants[this.selectedVariant].variantimage;   
           },
           inventory(){
              return this.variants[this.selectedVariant].variantQuantity;   
           },
           shipping(){
               if(this.premium){

               return "Free"

               }else{

                return 2.99 

               }
              
        }  
          }
         
  })

  Vue.component('product-review',{

    template:`
    <div>
    <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length"></p>
    <b>Please correct following errors : </b>
    <ul>
    <li v-for="error in errors">
    <p>{{error}}</p>
    </li>
    </ul>
     <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p> 
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>
  </div>
    `,
    data(){
        return {
            name: null,
            review: null,
            rating: null,
            errors :[]
          }
    },
    methods : {
        onSubmit(){
            if(this.name && this.review && this.rating){
                this.errors = [];
            let productReview = {
                name : this.name,
                review : this.review,
                rating : this.rating,

            }
         this.$emit('review-submitted', productReview)   
            this.name = null,
            this.review = null,
            this.rating = null
        }else{
            this.errors = [];
            if(!this.name)
            this.errors.push("Name is required");
            if(!this.review)
            this.errors.push("Review is required");
            if(!this.rating)
            this.errors.push("Rating is required");

        }
    }

    }

  })

var app = new Vue({
    el: '#app',
    data : {
        premium : true,
        cart : [],
    },
    methods : {

        updateCart(id){

        this.cart.push(id);

        }
    }
})

 