import { Category, ArticleSeed, UserSeed } from '../interfaces';

type SeedData = {
  users: UserSeed[];
  categories: Category[];
  articles: ArticleSeed[];
};

const users: UserSeed[] = [
  {
    name: 'Daniel González',
    email: 'daniel@gmail.com',
    emailVerified: new Date('2024-07-18T02:05:38.742Z'),
    password: 'abc123',
    role: 'admin',
    image: 'daniel.jpg'
  },
  {
    name: 'James Smith',
    email: 'james@gmail.com',
    emailVerified: new Date('2024-07-18T02:08:44.224Z'),
    password: 'abc123',
    role: 'author',
    image: 'james.jpg'
  },
  {
    name: 'Alice Johnson',
    email: 'alice@gmail.com',
    emailVerified: new Date('2024-07-18T02:10:15.145Z'),
    password: 'abc123',
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
    image: "javascript-datatypes.jpg",
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
    author: "Daniel González",
    publishedAt: "2024-07-15T14:02:25.324Z",
    robots: "index, follow"
  },
];

export const initialData: SeedData = {
  users,
  categories,
  articles,
};
