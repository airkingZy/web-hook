import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WebHook } from './webhook.interface';
import { CreateWebHookDto } from './create-webhook.dto';
import crypto = require('crypto');
import fs = require('fs');
import * as path from 'path';
import { exec } from 'child_process';

@Injectable()
export class WebHookService {
  constructor(
    @InjectModel('WebHook') private readonly webhookModel: Model<WebHook>,
  ) {}

  async create(createWebHookDto: CreateWebHookDto): Promise<WebHook> {
    const createdCat = new this.webhookModel(createWebHookDto);
    return createdCat.save();
  }
  async findAll(): Promise<WebHook[]> {
    const res = await this.webhookModel.find().exec();
    return res;
  }
  async uploads(files: any) {
    const writeFile = fs.createWriteStream(
      path.join(__dirname, `../../src/file/sh/${files.originalname}`),
      { encoding: 'utf8' },
    );
    writeFile.write(files.buffer);
    return {
      filename: files.originalname,
      dir: path.join(__dirname, `../../src/file/sh/${files.originalname}`),
    };
  }
  async getGitPush(obj: object, obj1: object): Promise<any> {
    // console.log(obj);
    const SECRET = 'MY_GITHUB_WEBHOOK_ZYSTYLISH';
    const hmac = crypto
      .createHmac('sha1', SECRET)
      .update(JSON.stringify(obj1))
      .digest('hex');
    const isAllowed = obj['x-hub-signature'] === `sha1=${hmac}`;
    const key1 = 'ref';
    const isMaster = obj1[key1] === 'refs/heads/master';
    const res = await this.webhookModel
      .findOne({ githubrepositorie: obj1[`repository`].full_name })
      .exec();
    if (isAllowed && res && isMaster) {
      // return { ok: 'ok' };
      try {
        exec(
          `cd ${res.localdir} && bash ${res.bashfile}`,
          async (error, stdout, stderr) => {
            if (error) {
              // console.log(`error: ${error.message}`);
              await this.webhookModel.update(
                {
                  githubrepositorie: res.githubrepositorie,
                },
                { status: 'fail', log: error },
              );
              return 'fail';
            }
            if (stderr) {
              // console.log(`stderr: ${stderr}`);
              await this.webhookModel.update(
                {
                  githubrepositorie: res.githubrepositorie,
                },
                { status: 'fail', log: stderr },
              );
              return 'fail';
            }
            // console.log(`stdout: ${stdout}`);
            await this.webhookModel.update(
              {
                githubrepositorie: res.githubrepositorie,
              },
              { status: 'success', log: stdout },
            );
            return 'success';
          },
        );
      } catch (err) {
        await this.webhookModel.update(
          {
            githubrepositorie: res.githubrepositorie,
          },
          { status: 'fail', log: err },
        );
        return 'fail';
      }
    }
    // const data = {
    //   header: obj,
    //   body: obj1,
    //   hmac: hmac,
    // };
  }
}
