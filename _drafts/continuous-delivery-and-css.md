---
layout: post
title: Continuous Delivery and CSS
---

Cloud infrastructure and software-as-a-service have triggered a massive change in
the way that we build and deploy software. Take [Mailgun](http://mailgun.com) for
example - Mailgun offers a reliable transactional email service. Sending email
is as easy as dropping in the Mailgun API bindings for the language of your choice.
Mailgun provides a versioned, RESTful API in order to decouple your application
from their application. The Twelve-Factor App [describes this well](http://12factor.net/backing-services):

> Each distinct backing service is a resource. For example, a MySQL database is a resource; two MySQL databases (used for sharding at the application layer) qualify as two distinct resources. The twelve-factor app treats these databases as attached resources, *which indicates their loose coupling to the deploy they are attached to*.

What happens behind the scenes at Mailgun? SOMETHING ABOUT X DEPLOYS/DAY, AND CONTINUOUS
DELIVERY and you don't have to do a thing. By treating Mailgun as a resource,
you can take advantage of their incremental improvements without changing a single
line of your code. Are RESTful APIs the only area where this concept can be applied?

As part of my work at Rackspace, I help bulid a CSS library called [Canon](http://canon-ui.com).
Canon is similar to Twitter Bootstrap - it consists of a collection of CSS classes
and UI patterns. Unlike Twitter Bootstrap, Canon is not simply a grab bag of tools
for use on any website. Canon is highly optimized for building Rackspace-branded
web applications and creating a consistent experience across all of our control
panels. WHAT IS MY TRANSITION TO INTRODUCE A CDN-BASED RELEASE AND PUSH BUTTON
DEPLOYS?

## Automated Testing

## Semantic Versioning

## Build Channels

---

Frame this in the context of third-party APIs and SaaS...

- Why do we blindly consume them? What risks are we exposed to?
- 12-Factor Applications

How do we apply continuous delivery principles to Canon?

- Semantic Versioning
- Build Channels
- "Build Quality In" -> http://continuousdelivery.com/wp-content/uploads/2014/02/01_CD_the_idea_low-res.jpg

Why is out situation different?
How does semantic versioning apply?
What does the Canon release process look like?
What does our deployment pipeline consist of?
What about minimizing HTTP requests?
How many customers/contorl panels are in use?

Disadvantages:

- How to share SCSS variables?

Room for Improvement:

- Single Trunk ala Google?
