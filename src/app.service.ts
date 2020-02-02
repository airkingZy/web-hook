import { Injectable } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';
// import fs from 'fs';
// import fs = require('fs');
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
// import './config/Repositories.json';
// import path from 'path';
@Injectable()
export class AppService {
  getHello(): string {
    const text = 'hello world';
    return text;
  }
}
