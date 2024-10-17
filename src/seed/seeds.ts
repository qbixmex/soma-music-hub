import { Category, ArticleSeed, UserSeed } from '../interfaces';

type SeedData = {
  users: UserSeed[];
  categories: Category[];
  articles: ArticleSeed[];
};

const users: UserSeed[] = [
  {
    name: 'Daniel Gonzalez',
    email: 'daniel@gmail.com',
    emailVerified: new Date('2024-07-18T02:05:38.742Z'),
    password: '12345678',
    role: 'admin',
    image: 'daniel.jpg'
  },
  {
    name: 'James Smith',
    email: 'james@gmail.com',
    emailVerified: new Date('2024-07-18T02:08:44.224Z'),
    password: '12345678',
    role: 'author',
    image: 'james.jpg'
  },
  {
    name: 'Alice Johnson',
    email: 'alice@gmail.com',
    emailVerified: new Date('2024-07-18T02:10:15.145Z'),
    password: '12345678',
    role: 'subscriber',
    image: 'alice.jpg'
  },
];

const categories: Category[] = [
  {
    name: "Javascript",
    slug: "javascript",
    description: "JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It is a language that is also characterized as dynamic, weakly typed, prototype-based, and multi-paradigm.",
  },
  {
    name: "React",
    slug: "react",
    description: "React is an open-source, front end, JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies.",
  },
  {
    name: "Typescript",
    slug: "typescript",
    description: "TypeScript is a strict syntactical superset of JavaScript that adds optional static typing to the language. TypeScript is designed for the development of large applications and transcompiles to JavaScript.",
  },
];

const articles: ArticleSeed[] = [
  {
    title: "Understanding the Basic Data Types in JavaScript",
    slug: "javascript-data-types",
    imageUrl: "/images/javascript-datatypes.jpg",
    imagePublicId: "80021e2a7e964ceca85dca0c4be47cef",
    description: "Learn about the fundamental data types in JavaScript and how they are used in programming.",
    category: "Javascript",
    content: `\
<p><b><em>JavaScript</em></b> is one of the most popular programming languages, has several fundamental data types that every developer should understand.</p><p>These data types are essential for building robust applications and managing data effectively.</p><p>Let's dive into the basic data types in JavaScript.</p><h2>Primitive Data Types</h2><p>Primitive data types are the simplest types of data and are immutable, meaning their values cannot be changed.</p><h3>Number</h3><p>Represents both integers and floating-point numbers.</p><pre><code class="language-javascript">const regex = /ab+c/;

console.log(regex);

// output: /ab+c/</code></pre><h2>String</h2><p>Represents a sequence of characters.</p><pre><code class="language-javascript">const title = "James Web discover life in a new new planet";

console.log(title);

// output: James Web discover life in a new new planet</code></pre><h3>Boolean</h3><p>Represents a logical entity and can have two values: <b><em>true</em></b> or <b><em>false</em></b>.</p><pre><code class="language-javascript">let isEnabled = true;

console.log(isEnabled);

// output: true</code></pre><h3>Undefined</h3><p>Is a data type where the value is undefined but the variable is assigned.</p><p>You can assign explicitly undefined but unnecessary because javascript can assign undefined explicitly.</p><pre><code class="language-javascript">// Explicit
let title = undefined;

console.log(title);

// output: undefined

// Implicit
let age;

console.log(age);

// output: undefined</code></pre><h3>Null</h3><p>Represents the intentional absence of any object value.</p><pre><code class="language-javascript">let address = null;

console.log(address);

// output: null</code></pre><h3>Symbol</h3><p>It is commonly used as key in an object.</p><pre><code class="language-javascript">const PRICE = Symbol('price');

const object = { [PRICE]: 14.25 };

console.log(object[PRICE]);

// output: 14.25</code></pre><h3>BigInt</h3><p>Introduced in <b><em>ES2020</em></b>, represents integers with arbitrary precision.</p><pre><code class="language-javascript">let bigInt = 1234567890123456789012345678901234567890n;

console.log(bigInt);

// output: 1234567890123456789012345678901234567890n</code></pre><h3>Non-Primitive Data Types</h3><p>These types are objects and can store collections of data and more complex entities.</p><h3>Object</h3><p>An unordered collection of key-value pairs.</p><pre><code class="language-javascript">const person = {
  name: "Stan Lee",
  age: 75
};

console.log(person.name);

console.log(person["age"]);

// ==== output ====
// Stan Lee
// 75</code></pre><h3>Array</h3><p>A special type of object that holds an ordered list of values.</p><pre><code class="language-javascript">// ==== Numbers Array ====
const numbers = [ 1, 2, 3 ];

console.log(numbers);

// output: [ 1, 2, 3 ]

// ==== Strings Array ====
const colors = [ 'red', 'green', 'blue' ];

console.log(colors);

// output: [ 'red', 'green', 'blue' ]</code></pre><h3>Function</h3><p>A special type of object that can be invoked.</p><pre><code class="language-javascript">function greeting(name) {
  console.log("Hello" + " " + name);
}

greeting("Daniel");

// output: Hello Daniel

// ==== Arrow Function Syntax ====

const greeting = (name) =&gt; {
  console.log(\`Hello \${name}\`);
};

greeting("James");

// output: Hello James</code></pre><h3>Date</h3><p>Represents dates and times.</p><pre><code class="language-javascript">const date = new Date();

console.log(date);

// ==== output example ====
// 2024-07-14T14:02:25.324Z</code></pre><h3>RegExp</h3><p>Represents regular expressions, used for pattern matching.</p><pre><code class="language-javascript">const regex = /ab+c/;

console.log(regex);

// output: /ab+c/</code></pre><h3>Special Cases</h3><p><b><em>NaN</em></b> (not a number) is a special numeric value that represents an undefined or un-representable value in arithmetic operations.</p><p><b><em>Infinity</em></b> and -Infinity: Special numeric values representing positive and negative infinity.</p><pre><code class="language-javascript">// ==== NaN ====

console.log(5 * 'abc');

// output: NaN

// ==== Infinity ====

const a = 2 / 0;

console.log(a);

// output: Infinity const b = -2 / 0;

console.log(b);

// output: -Infinity</code></pre>`,
    tags: ["javascript"],
    author: "Daniel Gonzalez",
    publishedAt: "2024-07-15T14:02:25.324Z",
    robots: "index, follow"
  },
  {
    title: "What's the benefits of using Typescript ?",
    slug: "benefits-using-typescript",
    imageUrl: "/images/typescript-benefits.jpg",
    imagePublicId: "abc123",
    description: "Discover the advantages of using TypeScript for your next project.",
    category: "typescript",
    content: `<h2>Introduction to TypeScript</h2><p>TypeScript is a superset of JavaScript that adds static typing and other features to the language. Here are some of the key benefits of using TypeScript:</p><h3>Static Typing</h3><p>Static typing helps catch errors at compile time, which can save a lot of debugging time. Here's an example:</p><pre><code class="language-typescript">const add = (a: number, b: number): number =&gt; {
  return a + b;
};

let result = add(5, 10);

// Valid

let wrongResult = add(5, "10");

// Error: Argument of type 'string' is not assignable to parameter of type 'number'.</code></pre><h3>Enhanced IDE Support</h3><p>TypeScript provides better autocompletion and IntelliSense features in modern IDEs, which can increase productivity. It also assists with safe refactoring.</p><h3>Better Code Maintainability</h3><p>The use of types makes the code more self-documenting, reducing the need for additional comments. It also makes collaboration easier:</p><pre><code class="language-typescript">// Example of a self-documenting function signature

interface User {
  name: string;
  age: number;
}

const createUser = ({ name, age }: { name: string, age: number }): User =&gt; {
  return { name, age };
};</code></pre><h3>Modern JavaScript Features</h3><p>TypeScript supports features from the latest versions of JavaScript, including classes, modules, and async/await:</p><pre><code class="language-typescript">class Person {
  constructor(private readonly name: string, private readonly age: number) {}

  greet() {
    console.log(\`Hello, my name is \${this.name} and I am \${this.age} years old.\`);
  }
}

let john = new Person('John', 30);

john.greet();

// Output: Hello, my name is John and I am 30 years old.</code></pre><h3>Large Scale Application Support</h3><p><b>TypeScript's features</b> are particularly beneficial for large-scale applications, where codebases are complex and many developers are involved. It encourages modularity and reuse, helping manage complexity in large projects.</p><h3>Optional Typing</h3><p>TypeScript allows incremental typing, meaning you can start with plain JavaScript and add types over time. This provides flexibility in adopting TypeScript:</p><pre><code class="language-typescript">// Plain JavaScript

let message = "Hello, World!";

// With type annotations

let typedMessage: string = "Hello, Tony Stark !";</code></pre><h3>Community and Ecosystem</h3><p>TypeScript has a large and active community. Many libraries and frameworks are adopting it, and the DefinitelyTyped project provides type definitions for a vast number of JavaScript libraries:</p><pre><code class="language-typescript">// Using type definitions from DefinitelyTyped

import * as _ from 'lodash';

let numbers: number[] = [ 1, 2, 3 ];
let doubledNumbers = _.map(numbers, n =&gt; n * 2);

// [2, 4, 6]</code></pre><h3>Conclusion</h3><p>Overall, TypeScript enhances the development experience by making the code more predictable, maintainable, and scalable. Whether you're working on a small project or a large-scale application, TypeScript can provide significant benefits.</p>`,
    tags: ["typescript"],
    author: "Daniel Gonzalez",
    publishedAt: "2024-07-18T14:00:00.000Z",
    robots: "index, follow",
  },
  {
    title: "How to create a React Component",
    slug: "how-to-create-a-react-component",
    imageUrl: "/images/how-to-create-a-react-component.jpg",
    imagePublicId: "abc123",
    description: "In this article I'll show you how to create a React Component with Typescript with Functional Components and Class Components.",
    category: "react",
    content: `<h2>Setting Up Your Environment</h2><p>Before creating a React component with TypeScript, ensure you have Node.js installed. Then, set up a new React project using Create React App with TypeScript template by running the following commands in your terminal:</p><pre><code class="language-bash">npx create-react-app my-app --template typescript
cd my-app npm start</code></pre><p>This will create a new React application with TypeScript support and start a development server.</p><h2>Creating a Functional Component</h2><p>Functional components with TypeScript are similar to JavaScript functional components, but with added type annotations.</p><p></p><h3>1. Create a Functional Component:</h3><p>Create a new file, e.g., MyComponent.tsx in the src folder:</p><pre><code class="language-tsx">// MyComponent.tsx
import React from 'react';

const MyComponent: React.FC = () =&gt; {
  return (
    &lt;React.Fragment&gt;
      &lt;h1&gt;Hello, this is a Functional Component!&lt;/h1&gt;
    &lt;/React.Fragment&gt;
   );
};

export default MyComponent;</code></pre><h3>2. <b>Use the Functional Component:</b></h3><p>Import and use this component in your main App.tsx file:</p><pre><code class="language-tsx">// App.tsx
import React from 'react';
import MyComponent from './MyComponent';

const App: React.FC = () =&gt; {
  return (
    &lt;React.Fragment&gt;
      &lt;MyComponent /&gt;
    &lt;/React.Fragment&gt;
  );
};

export default App;</code></pre><h2><b>Creating a Class Component</b></h2><p>Class components in TypeScript are similar to JavaScript class components, but with added type annotations.</p><h3>1. <b>Create a Class Component:</b></h3><p>Create a new file, e.g., MyClassComponent.tsx in the src folder:</p><pre><code class="language-tsx">// MyClassComponent.tsx
import React, { Component } from 'react';

interface MyClassComponentProps {}
interface MyClassComponentState {}

class MyClassComponent extends Component&lt;MyClassComponentProps, MyClassComponentState&gt; {
  render() {
    return (
      &lt;React.Fragment&gt;
        &lt;h1&gt;Hello, this is a Class Component!&lt;/h1&gt;
      &lt;/React.Fragment &gt;
    );
  }
}

export default MyClassComponent;</code></pre><h3>2. <b>Use the Class Component:</b></h3><p>Import and use this component in your main App.tsx file:</p><pre><code class="language-tsx">// App.tsx

import React from 'react';
import MyClassComponent from './MyClassComponent';

const App: React.FC = () =&gt; {
  return (
    &lt;div&gt;
      &lt;MyClassComponent /&gt;
    &lt;/div&gt;
  );
};

export default App;</code></pre><h2><b>Running Your App</b></h2><p>Once you have created your components and used them in your App.tsx, your application should automatically reload in the browser (if not, manually refresh the browser). You should see the output from your components.</p><h2><b>Summary</b></h2><ul><li><p>• <b>Functional Component</b>: A simple TypeScript function that returns <b>JSX</b>, using the React.FC type.</p></li><li><p>• <b>Class Component</b>: An ES6 class that extends React.Component with type annotations for props and state.</p></li><li><p>Both types of components can manage state and lifecycle methods, and <b>TypeScript</b> helps by providing type safety and autocompletion.</p></li></ul>`,
    tags: ["javascript", "typescript", "react"],
    author: "Daniel Gonzalez",
    publishedAt: "2024-07-17T08:00:00.000Z",
    robots: "index, follow",
  },
];

export const initialData: SeedData = {
  users,
  categories,
  articles,
};
