---
layout: post
title: Avoiding Complexity with Go
---

In ["No Silver Bullet"](http://en.wikipedia.org/wiki/No_Silver_Bullet), Fred 
Brooks makes an important distinction between **accidental complexity** and 
**essential complexity**. *Essential complexity* is complexity resulting from 
the problem domain. For example, a developer building an SMTP client needs to 
deal with all of the nitty-gritty details of [RFC 5321](http://tools.ietf.org/html/rfc5321) 
-- there is no way to avoid it and come out with a working SMTP client. On the 
other hand, *accidental complexity* is complexity arising from problems we 
create for ourselves. 

As engineers, we need to be very careful not to burden ourselves with accidental 
complexity arising from our choices. Language choice is a perfect example of the 
type of decision we can make to reduce accidental complexity. Would you write a
web application in assembly? How about C? Of course not! Higher level languages
offer us faster and more expressive means of building software. In fact, this is
exactly what Brooks was referring to when he asserted that we have already 
cleaned up much of the accidental complexity of software development. Similarly,
we should be very careful not to burden ourselves with tooling or any technology 
that unnecessarily increases the amount of accidental complexity with which 
developers must deal. It becomes more difficult to onboard new developers. Even
more experienced developers will begin to lose their grasp on the entire 
system. Ultimately, accidental complexity will cripple even the best developers 
and the highest performing teams.

## The Evolution of Accidental Complexity

Over the last ten years, there have been many changes to the way in which we 
build and deploy software. Unfortunately, I believe this is one area where we 
have introduced a tremendous amount of accidental complexity. When I started 
building web applications around 2000, I started with PHP and everything was 
very simple. I didn't have any third-party libraries, and I definitely didn't 
need a package manager. When I was ready to ship, I just uploaded any changed
files to an FTP server. Apache and mod_php handled the rest. Not everything was
perfect of course. Setting up a local environment was a nightmare. Testing was
non-existent.

Around 2005, I started using Ruby on Rails. Rails was a major improvement to the 
status quo. Development tools were phenomenal. It was easy to write tests, and 
spinning up a dev environment was dead simple. Ruby shipped with Ruby Gems. I'm 
fairly certain this was my first exposure to a language with a package manager. 
All this power also came at a price. Running Rails on FastCGI wasn't great, so I 
had to run Apache and Mongrel. When you had multiple apps running on the same 
server, dependency hell was always an issue.

Building and running a modern Rails application is not a trivial task. The sheer 
amount of moving pieces involved in getting an application up and running is 
staggering. Off the cuff, here is the list of software I need to learn to build 
and deploy a typical Rails app: Ruby, Ruby Gems, Bundler, rbenv, unicorn, Rack, 
Rake, Capistrano, and Rails. Of course, you'll need testing tools, too. You might 
need background workers and message queues. How do you ever get any work done 
when you have to mess with all these tools? I'm picking on Rails, but I see 
similar amounts of complexity in most modern tech stacks. To work with 
JavaScript in the browser, you even need a 
[package manager](https://www.npmjs.org) to install your 
[package manager](http://bower.io). The rise of the polyglot programmer has only 
multiplied the complexity. On my last project, we used Python, Ruby, and 
JavaScript. On my current project, we use Python, Go, and JavaScript. On each of 
these projects, most developers needed to know three languages and three sets of 
tools. This is the world of modern software development.

To be clear: **I don't think these tools are bad, and I don't think the authors
are bad people for writing them.** These tools bring tremendous benefits. 
However, complexity usually ends up causing more complexity. We should all look 
for opportunities to reduce the number of moving pieces in our applications.

## Go Encourages Simplicity

Go is a strikingly simple language. It provides a toolset that is both complete
and minimalist. In ["Go Is a Shop-built Jig"](http://robnapier.net/go-is-a-shop-built-jig), 
Rob Napier gives an excellent run down on exactly why Go's simple nature is so 
beneficial. In particular, one comment stood out to me:

> Go feels under-engineered because it only solves real problems.

I'll take this comment a step further. What a developer might perceive as 
under-engineering in Go is actually an explicit decision designed to avoid 
accidental complexity. Rather than diving into language features that exhibit 
this quality, I will focus on two aspects of the languages tooling that stand in 
stark contrast to the nightmarish tooling that is typical of languages today.

First, HTTP services built with Go are self-hosting. Go isn't alone in this, of 
course. When Node.js rose to prominence a few years ago, the ability to 
self-host web applications was one of its most touted features. Even ASP.NET now
features the ability to self-host applications. This feature is simply a benefit
of a modern standard library. It doesn't stop with HTTP either. Go features 
proxies, web sockets, SPDY, and a slew of other networking libraries that make 
it dead simple to build networked applications. As a result, you no longer need 
an app server such as uWSGI, Unicorn, or Tomcat to serve your application. You 
don't need to understand the finer details of Rack or WSGI. You've eliminated 
one small layer of overhead from your application.

Second, Go applications compile to a binary, and all run-time depedencies are 
compiled into the binary. If self-hosting was a small departure from the 
complexities of Ruby and Python, binary distributions are a whole different 
world. You've eliminated the need for a language runtime, package manager, 
and environment manager. Even for experienced Ruby or Python developers, dealing 
with environments and dependency versioning can be an absolute nightmare. In Go,
you can easily use applications built with different versions of Go on the same 
server. You can easily use different versions of the same dependency without 
having to fight conflicts. This eliminates a giant slice of complexity from your
system as well as your deployment process.

## Choose Complexity Wisely

Go isn't perfect for every task. However, if you're building concurrent network
services, Go is definitely a choice worth considering. To boot, you'll ditch a 
lot of the tooling complexity associated with languages like Ruby or Python. 
Ultimately, it is up to you and your team to decide the best language and tools 
with which to build your application. While making that decision, I hope that 
you will take a moment to weigh the trade-offs that come with your choices. 
