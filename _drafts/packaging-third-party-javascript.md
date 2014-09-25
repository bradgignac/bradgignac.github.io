---
layout: post
title: Packaging Third-Party JavaScript
---

At Rackspace, I see the full gamut of web applications. From server-rendered
Django applications with very little JavaScript to client-rendered single page 
applications built with AngularJS, we have a little bit of everything. 
While most of these web applications have traditionally been monolithic, there 
has been a recent push to break them into smaller service-oriented applications. 
With this development model, we will drastically reduce duplication across these 
applications. Even more importantly, the amount of cross-team change 
coordination will be cut down. For example, the navigation for some applications 
is now a standalone application. A single team is able to push navigation 
changes across many properties. Rackspace isn't alone in this model of 
development -- [Spotify](#) and [Groupon](#) have published wonderful blog posts 
describing how they have adopted this development model.

Naturally, we've experienced growing pains along the way. One of the issues that 
constantly arises is how to handle JavaScript. Server-side development has 
its own set of issues, but they are isolated inside their own runtime. On the 
other hand, client-side assets such as JavaScript have no sandbox -- they can 
interact with each other in unexpected ways. This type of JavaScript is commonly 
called *third-party JavaScript*. For the purposes of this post, I'll refer to 
*third-party JavaScript* as any JavaScript application that is being embedded 
inside of another application. [jQuery](#), for example, is not an application 
in and of itself. It is simply a library. [Disqus](#), on the other hand, is a 
full application that you can embed inside your application.

There are a whole host of issues to consider when writing embeddable JavaScript 
applications. In this post, I'll focus on a few simple guidelines you should 
follow to make sure that you don't break the host application. These guidelines 
are also useful for evaluating code that you might embed into your site. 

## Avoid Manipulating Globals

Do not manipulate global state, unless you do it through a well-defined API. 
This is a frequent cause of problems, and in my experience, they can be very 
hard to track down. About two years ago, we were integrating an analytics 
package into the [Cloud Control Panel](#), and everything was humming along. 
Suddenly, our automated tests were detecting regression in parts of the 
application that were completely unrelated to analytics. In the end, we found 
that variable renaming performed by the Closure Compiler was causing conflicts 
with renamed variables being dumped into the global namespace by the analytics 
package. 

Let's take a very simple embedded application and remove all global state 
manipulation. In this example, we will build a "Like" button similar to the type
of button found on Facebook. Here's our starting point:

{% highlight javascript %}

var registerLike, buildButton, button;

// Define method for sending like to server.
registerLike = function (e) {
  $.post('https://likeitall.com/like', function () {
    alert('Liked!');
  });
};

// Define method for building like button.
buildButton = function () {
  var button;

  button = $('<div class="like-btn"><i class="like-icon"></i> Like</div>');
  button.click(registerLike);
  return button;
};

// Build UI for Like button.
button = buildButton();
$('body').append(button);

{% endhighlight %}

The above code is quite simple. It appends a DIV to the DOM. When the DIV is 
clicked, it makes an XHR request to the backend and shows an alert dialog when
the request completes. For this example, we assume cross-origin requests are not
a problem and do not implement any error handling. The first problem that stands
out into this example is that it leaks variables into the global scope. 
Fortunately, this is an easy fix.

{% highlight javascript %}

(function (window, document, $, undefined) {
  var registerLike, buildButton, button;

  // Define method for sending like to server.
  registerLike = function (e) { ... };

  // Define method for building like button.
  buildButton = function () { ... };

  // Build UI for Like button.
  button = buildButton();
  $('body').append(button);
})(window, document, jQuery);

{% endhighlight %}

After wrapping the code from the first example in an [IIFE](#), the variables 
`registerLike`, `buildButton`, and `button` no longer leak into the global 
scope. We also pass in `window` and `document` to reduce our reliance on globals
that are used by our application. In this case, we've manually wrapped our code
in an IIFE, but this can easily be added by your favorite build tool. For 
example, [UglifyJS2](#) supports the `--wrap` option to embed the compiled 
JavaScript into a function. [UMD](#) modules give you the benefits of IIFE 
along with support for multiple module definitions.

- Expose an API through a namespace.
  - Pick namespace carefully, i.e. no $.
  - Handle async loading.
  - Remember to make this pass the "two apps on a page" rule.
- Modify the DOM.

---

- Minimal side effects from including your scripts.
- Implement your widget twice on the same page.
- No globals (or one single namespace to which everything is attached)
- No DOM modification (except to a portion of the DOM that is given to you)
  - Remember, this includes use of IFRAMEs for communication.
- Mention Closure Compiler advanced compilation.

Wrap up with "two apps on a page"...

## Avoid Single Points of Failure

- Don't assume synchronous loading.
- Provide an async API.

## Performance Matters

We've grown up being told not to prematurely optimize.

- Use a scout file.
- Minimize dependencies.
- Lazy load dependencies and additional assets.
- CDN, Gzip, basic performance stuff.

---

- Same Origin Policy
- CSP
- How to provide an API **AND** asynchronous loading?
- Facebook JS API, Twitter JS API, Google Analytics

- https://alexsexton.com/talks/thirdparty/#deliver
- http://blog.errorception.com/2012/01/writing-quality-third-party-js-part-1.html
- http://blog.errorception.com/2012/01/writing-quality-third-party-js-part-2.html
- http://blog.errorception.com/2012/01/writing-quality-third-party-js-part-3.html
- http://www.stevesouders.com/blog/2010/05/11/appendchild-vs-insertbefore/
- http://www.stevesouders.com/blog/2010/06/01/frontend-spof/
- http://www.manning.com/vinegar/excerpt_contents.html
- http://www.manning.com/vinegar/TPJS-Sample1.pdf
- http://www.manning.com/vinegar/TPJS-Sample4.pdf

"Implement your widget twice on the same page"
