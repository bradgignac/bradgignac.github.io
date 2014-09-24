---
layout: post
title: Sending Email with Python and the Mailgun API
tags:
  - Mailgun
  - Python
---

Mailgun makes sending email from code dead simple. In this post, I'll run
through the basics of sending email using Python and the Mailgun API. I'll also
explore email tracking, one of the extras that you get from using Mailgun. To
get started, you'll need a Mailgun account - [sign up here](https://mailgun.com/signup)
if you don't already have an account. You'll need a few pieces of information
from the Mailgun control panel before moving forward:

1. API Key
2. Sandbox Domain URL

Both of these pieces of information can be found on the landing page of the
Mailgun control panel. You'll also need the following software installed on your
system:

1. Python 2.6 or higher
2. [requests](https://pypi.python.org/pypi/requests)

## Sending Your First Email

Now that you have all the necessary prerequisites, let's dive straight into the code:

<figcaption>send-email.py</figcaption>
{% highlight python %}
import requests

key = 'YOUR API KEY HERE'
sandbox = 'YOUR SANDBOX URL HERE'
recipient = 'YOUR EMAIL HERE'

request_url = 'https://api.mailgun.net/v2/{0}/messages'.format(sandbox)
request = requests.post(request_url, auth=('api', key), data={
    'from': 'hello@example.com',
    'to': recipient,
    'subject': 'Hello',
    'text': 'Hello from Mailgun'
})

print 'Status: {0}'.format(request.status_code)
print 'Body:   {0}'.format(request.text)
{% endhighlight %}

If you run the Python script from your terminal, you'll receive an email in just
a few minutes. This only scratches the surface of what the Mailgun API provides.
For more information, check out the [Messages](http://documentation.mailgun.com/api-sending.html)
section of the Mailgun API.

## Tracking Email Delivery

We're successfully sending emails, so let's see if they are actually being
delivered. Mailgun provides the [Events API](http://documentation.mailgun.com/api-events.html)
for exactly this purpose.

<figcaption>list-events.py</figcaption>
{% highlight python %}
import requests

key = 'YOUR API KEY HERE'
sandbox = 'YOUR SANDBOX URL HERE'

request_url = 'https://api.mailgun.net/v2/{0}/events'.format(sandbox)
request = requests.get(request_url, auth=('api', key), params={'limit': 5})

print 'Status: {0}'.format(request.status_code)
print 'Body:   {0}'.format(request.text)
{% endhighlight %}

Run the Python script from your terminal, and you'll see the last five events
that your emails have generated as they move through the system. In addition to
exploring events through the API, visit the [Tracking](https://mailgun.com/cp/stats)
section of the control panel. To learn more about events, check out the section
on [Tracking Messages](http://documentation.mailgun.com/user_manual.html#tracking-messages)
in Mailgun's documentation.

## Next Steps

As you've seen, Mailgun makes sending email programmatically easy. If you are
interested in learning more, I encourage you to check out the rest of the
[Mailgun documentation](http://documentation.mailgun.com). They offer many other
useful features such as handling unsubscribe requests, scheduling delivery, and
much more.
