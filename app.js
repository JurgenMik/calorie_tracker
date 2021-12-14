//Storage Controller

//Item Controller
const ItemCtrl = (function(){
    // Item Constructor
    const Item = function(id, name, calories) {
        this.id = id
        this.name = name
        this.calories = calories
    }

    const data = {
        items: [
            {id: 0, name: 'Steak DInner', calories: 1200},
            {id: 1 ,name: 'Cookie', calories: 400},
            {id: 2 ,name: 'Eggs', calories: 300}
        ],
        total: 0
    }

    return {
        getItems: function() {
            return data.items
        },
        addItem: function(name, calories){
           let ID;
           //create ID
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0
            }
            // calories to number
            calories = parseInt(calories);
            // create new item
            newItem = new Item(ID,name , calories);
            // add to items array
            data.items.push(newItem);
            // return new item
            return newItem
        },
        logData: function() {
            return data
        }
    }
})();

//UI Controller
const UICtrl = (function(){
    // UI selectors
      const UISelectors = {
          itemList: '#item-list',
          itemNameInput: '#item-name',
          itemCaloriesInput: '#item-calories',
          addBtn: '.add-btn'
      }
    return{
        populateItemList: function(items){
            // create html content
            let html = '';

            //parse data and create list items html
            items.forEach(function(item) {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong> ${item.name}:</strong> <em> ${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
</a>
</li>`;
            });

            // insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function(){
            return UISelectors;
        },

        getItemInput: function(){
            return{
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        }
    }
})();

//App Controller
const App = (function(ItemCtrl, UICtrl){
     // Load event listeners
    const LoadEventListeners = function(){
        // get UI selectors
        const UISelectors = UICtrl.getSelectors();
        // add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);

    }
    // item add submit function
    const itemAddSubmit = function(event){
        //get form input from UI Controller
        const input = UICtrl.getItemInput()
        // check for name and calorie input
        if(input.name !=='' && input.calories !==''){
            ItemCtrl.addItem(input.name, input.calories)
            const newItem = ItemCtrl.addItem(input.name, input.calories)
            console.log(newItem)
        }
        event.preventDefault();
    }

    return{
        init: function(){
            console.log('Initializing Aps')
            // fetch items from data structure
            const items = ItemCtrl.getItems()
            // populate items list
            UICtrl.populateItemList(items)
            // load event listeners
            LoadEventListeners();
        }
    }
})(ItemCtrl,UICtrl);

App.init()

