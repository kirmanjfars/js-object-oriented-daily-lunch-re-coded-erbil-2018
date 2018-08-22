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

}


class Meal{
  constructor(title, price){
    this.title = title; 
    this.price = price;
    this.id = mealIds++;
    store.meals.push(this);
  }
}



class Customer{
  constructor(name, neighborhoodId){
    this.name = name; 
    this.neighborhoodId = neighborhoodId;
    this.id = customerIds++;
    store.customers.push(this);

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
    return store.customers.find(d => d.id = this.customerId)
  }
}

