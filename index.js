// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };



let neighborhoodIds = 0;
let customerIds = 0;
let mealIds=0;
let deliveryIds =0;

class Neighborhood{
  constructor(name){
    this.name = name;
    this.id = neighborhoodIds++;
    store.neighborhoods.push(this);
  }
  
  deliveries(){
    return store.deliveries.filter(d=> d.neighborhoodId === this.id)
  }
  
  customers(){
    return store.customers.filter(d=> d.neighborhoodId === this.id)
  }
  
  meals(){
     const allMeals = this.customers().map(customer => customer.meals());
      const merged = [].concat.apply([], allMeals);
      return [...new Set(merged)];
  }

}


// class Meal{
//   constructor(title, price){
//     this.title = title; 
//     this.price = price;
//     this.id = mealIds++;
//     store.meals.push(this);
//   }
//   deliveries() {
//       return store.deliveries.filter(delivery => delivery.mealId === this.id);
//     }

//     customers() {
//       const allCustomers = this.deliveries().map(delivery => delivery.customer());
//       return [...new Set(allCustomers)];
//     }

    
//     static byPrice(){
//       return  store.meals.sort(function(a,b){
//         return a.price < b.price;
//       })
//     }
  

// }


const Meal = (() => {
  let mealIds = 1;
  return class {
    constructor(title, price = 0) {
      this.id = mealIds++;
      this.title = title;
      this.price = price;
      store.meals.push(this);
    }

    deliveries() {
      return store.deliveries.filter(delivery => delivery.mealId === this.id);
    }

    customers() {
      const allCustomers = this.deliveries().map(delivery => delivery.customer());
      return [...new Set(allCustomers)];
    }

    static byPrice() {
      return store.meals.sort((a, b) => a.price < b.price);
    }
  };
})();



class Customer{
  constructor(name, neighborhoodId){
    this.name = name; 
    this.neighborhoodId = neighborhoodId;
    this.id = customerIds++;
    store.customers.push(this);

  }
  
  
  deliveries(){
    return store.deliveries.filter(c => c.customerId === this.id)
  }
  
 meals() {
      return this.deliveries().map(delivery => delivery.meal());
    }
    
    totalSpent(){
      
      return this.meals().reduce(function(ac, e){
         return  ac += e.price;
      }, 0);
      
    }
}



class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.id = deliveryIds++;
    this.mealId = mealId; 
    this.neighborhoodId=neighborhoodId;
    this.customerId= customerId;
    store.deliveries.push(this);
  }
  
  meal(){
   return store.meals.find(d=> d.id === this.mealId)
  }
  
  customer(){
    return store.customers.find(d => d.customerId = this.id)
  }
  neighborhood(){
    return store.neighborhoods.find(d => d.neighborhoodId = this.id)
  }
}

