---
layout: post
title: Reading List
tags:
  - Books
  - Reading
---

{% assign groups = site.books | group_by_exp: 'item', 'item.end_date | date: "%Y"' %}

{% for group in groups %}
  <div class="bg-reading-list">
    {% if group.name %}
    <h2 class="bg-reading-list-header">{{ group.name }}</h2>
    {% else %}
    <h2 class="bg-reading-list-header">Currently Reading</h2>
    {% endif %}

    {% assign books = group.items | sort: 'name' | sort: 'start_date' | sort: 'end_date' %}
    <ul class="bg-reading-list-group">
    {% for book in books %}
      <li class="bg-reading-list-group-item"><a href="{{ book.link }}" target="_blank">{{ book.title }}</a>, by {{ book.author }}</li>
    {% endfor %}
    </ul>
  </div>
{% endfor %}
