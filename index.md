---
layout: page
title: Comtu
tagline: 一个人的改变，源自于自我的一种积极进取，而不是等待什么天赐良机。
---
{% include JB/setup %}

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

