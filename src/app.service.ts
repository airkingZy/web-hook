import { Injectable } from '@nestjs/common';
import axios from 'axios';
const cheerio = require('cheerio');
@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    let text = '';
    await axios
      .get('http://www.xbiquge.la/15/15451/8177023.html')
      .then(res => {
        const htmldata = res.data.toString();
        const $ = cheerio.load(htmldata, { decodeEntities: false });
        text = $('#content')
          .html()
          .replace(/<br>/g, '');
        console.log(text);
      })
      .catch(err => {
        text = 'err';
      });
    return text;
  }
  async searchList(name: string): Promise<Object> {
    let text = [];
    const keyword = encodeURI(name);
    await axios
      .get(`http://www.147xiaoshuo.com/search.php?keyword=${keyword}`)
      .then(res => {
        const htmldata = res.data.toString();
        const $ = cheerio.load(htmldata);
        const length = $('#bookcase_list').find('tr').length;
        for (let i = 0; i < length - 1; i++) {
          let param = {
            name: $('#bookcase_list')
              .find('tr')
              .eq(i)
              .find('td')
              .eq(0)
              .find('a')
              .text(),
            booksite: $('#bookcase_list')
              .find('tr')
              .eq(i)
              .find('td')
              .eq(0)
              .find('a')
              .attr('href'),
            chapter: $('#bookcase_list')
              .find('tr')
              .eq(i)
              .find('td')
              .eq(1)
              .text(),
            newsite: $('#bookcase_list')
              .find('tr')
              .eq(i)
              .find('td')
              .eq(1)
              .find('a')
              .attr('href'),
            author: $('#bookcase_list')
              .find('tr')
              .eq(i)
              .find('td')
              .eq(2)
              .text()
              .trim(),
            updateTime: $('#bookcase_list')
              .find('tr')
              .eq(i)
              .find('td')
              .eq(3)
              .text()
              .trim(),
            status: $('#bookcase_list')
              .find('tr')
              .eq(i)
              .find('td')
              .eq(4)
              .text()
              .trim(),
            localStatus: '未入库',
          };
          text.push(param);
        }
      })
      .catch(err => {
        console.log(err);
      });
    return text;
  }
  async getBookDetail(url: string): Promise<Object> {
    let text = {};
    await axios.get(`http://m.147xiaoshuo.com/book/${url}.html`).then(res => {
      const htmldata = res.data.toString();
      const $ = cheerio.load(htmldata, { decodeEntities: false });
      text['title'] = $('#nr_title').text();
      text['content'] = $('#nr')
        .html()
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '\n');
      text['prev'] = $('#pt_prev')
        .attr('href')
        .replace(/\/book\//g, '')
        .replace(/.html/g, '');
      text['next'] = $('#pt_next')
        .attr('href')
        .replace(/\/book\//g, '')
        .replace(/.html/g, '');
    });

    return text;
  }
}
