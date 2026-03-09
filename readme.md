# 1. What is the difference between var, let, and const?

`Ans:` 

**const:** when we need to store constant value, we use const. for primitive data, we can't modify, update, reassign value to the variable declaired using const keyword. for not-primitive, we can modify the data but we can't totally reassign a whoole new value to the variable. unlike var, it is block-scoped (stays inside { }) and lives in the "Temporal Dead Zone" until the code reaches it, so we can't use it before declaring.

**var:** it's an old keyword to declaire a variable. it is function-scoped. it can be hoisted and initialized as "undefined," meaning we can access it before the line it is written (though it will be undefined). we can modify, update, or assign value declaired with var keyword. but it has many problems, like we can declaire two variable with the same name in the same scope.

**let:** It's the modern way to declare variable. we can say it's the updated version of var. it is block-scoped, which means it only works inside the curly braces `{}` it was created in. like const, it is hoisted but cannot be accessed before its declaration.



# 2. What is the spread operator (...)?

`Ans:`

It's a very handy tool that comes with ES6. We use three dots `...` to implement it. It "spreads" or unpacks the elements of an array or an object. 

* we use it to copy an array or object into a new one.
* we can merge two or more arrays easily.
* it's very useful when we want to add new data to an existing array without changing the original one.


# 3. What is the difference between map(), filter(), and forEach()?

`Ans:`

**map()**
* It's a built in function comes with ES6. 
* we use it to iterate through array and it returns a new array.
* takes a callback function as it's paramerter.
* inside callback's parameter: element, index, array.
* it return a modified version of every element of the array.

**filter()**
* another built in function from ES6 to iterate every element of an `array`.
* we can filter elements with particular logic and then it will give a new array of those filtered elements.

**forEach()**
It's a powerfull and awesome to loop through every element of an Array. We can say it's a short version of `for loop`. it was also comes with js ES6. One thing to remember: it doesn't return anything (returns undefined).


# 4.  What is an arrow function?

`Ans:`

Arrow function is the modern way to create function in js which comes with ES6. we declare it like this: 

`const/let nameOfFunction = (parameters) => {function body};`

* it doesn't have it's own 'this', it takes 'this' from its parent scope.
* they are not hoisted, so you must define them before you call them.


# 5. What are template literals?

`Ans:`

It'a another jem of js ES6. Using single or double quotes, we can't write multiline string. we can solve this problem using template literals. we use backtick (` `) to implement template literals. variables can be use inside backtick using `${variableName}`. Here is the example: 

const pi= 3.1415

let multiLine = `
                The value of pi is: ${pi}.
                and We can't change it.
`