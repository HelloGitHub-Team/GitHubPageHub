#!/usr/bin/env python3
# -*- coding:utf-8 -*-
# 
#   Author  :   XueWeiHan
#   Date    :   19/06/23 下午1:44
#   Desc    :
import os

import requests
from jinja2 import Environment, FileSystemLoader

url_prefix = 'url（地址）:'
desc_prefix = 'description（描述）:'
tag_prefix = 'tag（标签）:'
name_prefix = 'name（名称）:'
all_tag = [
    '算法/数据结构', 'OI/ACM', '前端', '后端', 'Android', 'iOS', '人工智能',
    '产品', '数据库', '服务器','编程语言', '区块链', '架构', '运维', '游戏', '物联网',
    '安全', '云计算/大数据'
]


def parse_blog(content):
    blog_list = []
    begin_flag = 'begin'
    end_flag = 'end'
    is_begin = False
    is_end = False
    blog_item = {}
    for fi_line in content:
        line = fi_line.strip()
        if line == begin_flag:
            is_begin = True
        elif line == end_flag:
            is_end = True
        if is_begin is True:
            if line.startswith(url_prefix):
                url = line.replace(url_prefix, '').strip()
                if url:
                    blog_item['url'] = url
            elif line.startswith(desc_prefix):
                desc = line.replace(desc_prefix, '').strip()
                if desc:
                    blog_item['desc'] = desc
            elif line.startswith(name_prefix):
                name = line.replace(name_prefix, '').strip()
                if name:
                    blog_item['name'] = name
            elif line.startswith(tag_prefix):
                blog_item['tags'] = []
                tags = line.replace(tag_prefix, '').strip()
                tag_list = tags.split('|')
                for fi_tag in tag_list:
                    if fi_tag in all_tag:
                        blog_item['tags'].append(fi_tag)

        if is_end is True:
            speed = get_load_time(blog_item.get('url'))
            if speed != -1:
                blog_item['speed'] = speed
            blog_list.append(blog_item)
            is_begin = False
            is_end = False
            blog_item = {}
    return blog_list


def get_load_time(blog_url):
    """
    检测记录的 blog 访问速度，-1 为超时
    """
    try:
        response = requests.get(blog_url, verify=False, timeout=15)
        speed_seconds = response.elapsed.total_seconds()
    except Exception as e:
        print(e)
        speed_seconds = -1
    return speed_seconds


def read_blog_data(file_path):
    with open(file_path, 'rb') as fb:
        blog_content = fb.read().decode('utf-8')
        blog_content = blog_content.split('\n')
        return parse_blog(blog_content)


def make_html(html_file_name, all_blog_data, output_file_path):
    file_path = os.path.dirname(os.path.abspath(__file__))
    env = Environment(
        autoescape=False,
        loader=FileSystemLoader(os.path.join(file_path, 'templates')),
        trim_blocks=False)
    template = env.get_template(html_file_name)
    with open(output_file_path, 'wb+') as fb:
        fb.write(template.render(all_blog=all_blog_data).encode('utf-8'))


if __name__ == '__main__':
    blog_data_file_path = os.path.join(
        os.path.abspath(os.path.dirname(os.path.dirname(__file__))), 'blogs.md')
    all_blog_data = read_blog_data(file_path=blog_data_file_path)
    index_file_path = os.path.join(
        os.path.abspath(os.path.dirname(os.path.dirname(__file__))), 'index.html')
    make_html('index.html', all_blog_data, index_file_path)
