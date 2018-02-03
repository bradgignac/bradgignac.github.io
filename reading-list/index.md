---
layout: post
title: Reading List
tags:
  - Books
  - Reading
---

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
