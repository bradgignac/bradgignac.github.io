---
layout: post
title: Reading List
tags:
  - Books
  - Reading
---

{% comment %}
Sort books by `end_date`, then `start_date`, then `name`.
{% endcomment %}
{% assign groups = site.books | group_by_exp: 'item', 'item.end_date | date: "%Y"' %}

{% for group in groups %}
  {% if group.name %}
  <h2>{{ group.name }}</h2>
  {% else %}
  <h2>Currently Reading</h2>
  {% endif %}

  {% assign books = group.items | sort: 'name' | sort: 'start_date' | sort: 'end_date' %}
  <ul>
  {% for book in books %}
    <li><a href="{{ book.link }}" target="_blank">{{ book.title }}</a>, by {{ book.author }}</li>
  {% endfor %}
  </ul>
{% endfor %}

<!--{% for book in books reversed %}
  {% capture current_year %}{{ book.end_date | date: '%Y' }}{% endcapture %}
  {% capture next_year %}{{ book.pre.end_date | date: '%Y' }}{% endcapture %}

  {% if book %}
  {{ book.title }} - {{ book.end_date }}, {{ book.previous.end_date }}
  {% else %}

  {% comment %}
  Start "Currently Reading" group if it is the first book and it has no `end_date`.
  {% endcomment %}
  {% if forloop.first and book.end_date == nil %}
  <h2>Currently Reading</h2>
  <ul>
  {% endif %}

  <li><a href="{{ book.link }}" target="_blank">{{ book.title }}</a>, by {{ book.author }}</li>

  {% if forloop.last %}
  Last!
  {% comment %}
  Close `ul` for the last item.
  {% endcomment %}
  </ul>
  {% elsif current_year != next_year  %}
  {{ current_year }}
  {{ next_year }}
  {% comment %}
  Close `ul` tag and start next group if year changes.
  {% endcomment %}
  </ul>
  <h2>{{ next_year }}</h2>
  <ul>
  {% endif %}
  {% endif %}
{% endfor %}-->
