import test from 'ava';
import Unshort from 'url-unshort';
import { Urls } from '../src/index.js';

test('single url', async t => {
  const uu = Unshort();
  t.is(await uu.expand('https://t.co/z75WgBGPEL'), 'https://nan.fyi/');
});

test('multiple urls', async t => {
  const urls = {
    'https://t.co/z75WgBGPEL': 'https://nan.fyi/',
    'https://bit.ly/473uC9Q': 'https://ebsedu.org/pg-diploma/postgraduate-diploma-in-global-sports-management/?utm_source=socialmedia&utm_medium=organic&utm_campaign=PGD_Global_Sports_Management_31_Oct_2023',
  };

  const results = await Urls.expand(Object.keys(urls));

  t.deepEqual(results, urls);
});
